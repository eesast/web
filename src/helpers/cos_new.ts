/*
cos.ts中的写法与team耦合过于紧密，不便于添加新类型文件的上传下载
在添加新生导师的谈话记录提交功能时重新改写此页，但保留原页功能，后续合并
上传的逻辑为：
文件内容, 上传路径, 鉴权方式(路由), 鉴权所需参数(一个键值表对象)
下载的逻辑为：
下载路径，鉴权路由，鉴权所需参数
*/
import COS from "cos-js-sdk-v5";
import axios from 'axios';

let path = '';
let params = {};
let bucket = 'eesast-1255334966';
let region = 'ap-beijing';
const cos = new COS({ //getAuthorization会在每次使用cos时调用
  getAuthorization: async (options: object, callback: Function) => {
    try {
      const response = await axios.get(`/static/${path}`, {
        params: params
      });
      if (response.status === 200) {
        if (!response.data.credentials) throw (Error("Credentials invalid!"));
        callback({
          TmpSecretId: response.data.credentials.tmpSecretId,
          TmpSecretKey: response.data.credentials.tmpSecretKey,
          SecurityToken: response.data.credentials.sessionToken,
          StartTime: response.data.startTime,
          ExpiredTime: response.data.expiredTime,
        });
      }
      else throw (Error(response.data));
    } catch (err) {
      return console.log(err);
    }
  }
});

export const uploadFile = (file: any, url: string, _path: string, _params: object) => {
  path = _path;
  params = _params;
  return cos.uploadFile({
    Bucket: bucket,
    Region: region,
    Key: url,
    Body: file,
    SliceSize: 1024 * 1024 * 5
  });
}

const downloadByUrl = (url: string) => {
  var element = document.createElement('a');
  element.href = url;
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

export const downloadFile = (url: string, _path: string, _params: object) => {
  path = _path;
  params = _params;
  return new Promise ((resolve, reject) => {
    cos.getObjectUrl({
      Bucket: bucket,
      Region: region,
      Key: url,
    }, (err, data) => {
      if (err) return reject(err);
      downloadByUrl(data.Url + (data.Url.indexOf('?') > -1 ? '&' : '?') + 'response-content-disposition=attachment;')
      return resolve(data);
    });
  });
}

export const listFile = (prefix: string, _path: string, _params: object) => {
  path = _path;
  params = _params;
  return new Promise <COS.CosObject[]>((resolve, reject) => {
    cos.getBucket({
      Bucket: bucket,
      Region: region,
      Prefix: prefix,
    }, (err, data) => {
      if (err || !data) return reject(err);
      return resolve(data.Contents);
    });
  })
}