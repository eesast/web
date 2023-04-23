import COS from "cos-js-sdk-v5";
import axios from 'axios';

const cos = new COS({
  getAuthorization: async (options: object, callback: Function) => {
    try {
      const response = await axios.get("/static");
      if (response.status === 200) {
        if (!response.data.credentials) throw(Error("Credentials invalid!"));
        callback({
          TmpSecretId: response.data.credentials.tmpSecretId,
          TmpSecretKey: response.data.credentials.tmpSecretKey,
          SecurityToken: response.data.credentials.sessionToken,
          StartTime: response.data.startTime,
          ExpiredTime: response.data.expiredTime,
        });
      }
      else throw(Error(response.data));
    } catch (err) {
      return console.log(err);
    }
  }
});

export const uploadFile = (file: any, location: string) => {
  return cos.uploadFile({
    Bucket: 'eesast-1255334966',
    Region: 'ap-beijing',
    Key: location.split('.').slice(0, -1).join('.'),  // location 去掉后缀名
    Body: file,
    SliceSize: 1024 * 1024 * 5  /* 触发分块上传的阈值，超过5MB使用分块上传，小于5MB使用简单上传。可自行设置，非必须 */
  });
}

export const downloadFile = (option: any) => {
  return new Promise ((resolve, reject) => {
    cos.getObjectUrl({
      Bucket: 'eesast-1255334966',
      Region: 'ap-beijing',
      Key: option.url,
    }, (err, data) => {
      if (err) reject(err);
      const downloadUrl = data.Url + (data.Url.indexOf('?') > -1 ? '&' : '?') + 'response-content-disposition=attachment;filename=' + option.filename;
      window.open(downloadUrl);
      resolve(data);
    });
  });
}

export const deleteFile = (location: string) => {
  console.log(location);
  return new Promise ((resolve, reject) => {
    cos.deleteObject({
      Bucket: 'eesast-1255334966',
      Region: 'ap-beijing',
      Key: location,
    }, (err, data) => {
      console.log(err);
      console.log(data);
      if (err) reject(err);
      resolve(data);
    });
  })
}

export const listFile = (prefix: string) => {
  return new Promise <COS.CosObject[]>((resolve, reject) => {
    cos.getBucket({
      Bucket: 'eesast-1255334966',
      Region: 'ap-beijing',
      Prefix: prefix,
    }, (err, data) => {
      if (err) reject(err);
      resolve(data.Contents);
    });
  })
}
