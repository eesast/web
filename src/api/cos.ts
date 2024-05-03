import COS from "cos-js-sdk-v5";
import axios from "axios";

let bucket =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_COS_BUCKET!
    : process.env.REACT_APP_COS_BUCKET_DEV!;
let region = "ap-beijing";
let path = "";
const cos = new COS({
  //getAuthorization的调用规范：https://cloud.tencent.com/document/product/436/11459
  getAuthorization: async (
    options: COS.GetAuthorizationOptions,
    callback: Function,
  ) => {
    try {
      const response = await axios.get(`/static/${options.Key || path}`);
      if (response.status === 200) {
        if (!response.data.credentials) throw Error("Credentials invalid!");
        callback({
          TmpSecretId: response.data.credentials.tmpSecretId,
          TmpSecretKey: response.data.credentials.tmpSecretKey,
          SecurityToken: response.data.credentials.sessionToken,
          StartTime: response.data.startTime,
          ExpiredTime: response.data.expiredTime,
          ScopeLimit: true, // 细粒度控制权限需要设为 true，会限制密钥只在相同请求时重复使用
        });
      } else throw Error(response.data);
    } catch (err) {
      return console.log(err);
    }
  },
});

export const uploadFile = (file: any, url: string) => {
  return cos.uploadFile({
    Bucket: bucket,
    Region: region,
    Key: url,
    Body: file,
    SliceSize: 1024 * 1024 * 5,
  });
};

const downloadByUrl = (url: string) => {
  var element = document.createElement("a");
  element.href = url;
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

export const downloadFile = (url: string, filename?: string) => {
  return new Promise(async (resolve, reject) => {
    if ((await existFile(url)) === false)
      return reject("文件不存在，请检查路径");
    cos.getObjectUrl(
      {
        Bucket: bucket,
        Region: region,
        Key: url,
      },
      (err, data) => {
        if (err) return reject(err);
        try {
          //备选，下载的文件后缀为.cpp/.py或.txt
          // downloadByUrl(
          //   data.Url +
          //     (data.Url.indexOf("?") > -1 ? "&" : "?") +
          //     "response-content-disposition=attachment;"+(filename ? "filename="+encodeURIComponent(filename.replace(".","_")+".txt") : ""),
          // );
          downloadByUrl(
            data.Url +
              (data.Url.indexOf("?") > -1 ? "&" : "?") +
              "response-content-disposition=attachment;" +
              (filename ? "filename=" + encodeURIComponent(filename) : ""),
          );
        } catch (err) {
          return reject(err);
        }
        return resolve(data);
      },
    );
  });
};

export const deleteFile = (url: string) => {
  return cos.deleteObject({
    Bucket: bucket,
    Region: region,
    Key: url,
  });
};

export const existFile = (url: string) => {
  return new Promise<boolean>((resolve, reject) => {
    cos.headObject(
      {
        Bucket: bucket,
        Region: region,
        Key: url,
      },
      (err, data) => {
        if (data) {
          return resolve(true);
        } else if (err && err.statusCode === 404) {
          return resolve(false);
        } else if (err && err.statusCode === 403) {
          return reject("Unauthorized");
        }
      },
    );
  });
};

export const listFile = (prefix: string) => {
  path = prefix;
  return new Promise<COS.CosObject[]>((resolve, reject) => {
    cos.getBucket(
      {
        Bucket: bucket,
        Region: region,
        Prefix: prefix,
      },
      (err, data) => {
        if (err || !data) return reject(err);
        return resolve(data.Contents);
      },
    );
  });
};
