/*
path为鉴权路由，params为所需参数(一个键值对象)，发送给后端(api/src/routes/static)进行权限申请
目前的路由：
- team_code: THUAI6选手代码
  参数为 team_id
- chat_record: 新生导师谈话记录
  参数为 application_id
- ''(默认空): 全局权限 
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

export const uploadFile = (file: any, url: string, _path: string = "", _params: object = {}) => {
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

export const downloadFile = (url: string, _path: string = "", _params: object = {}) => {
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

export const deleteFile = (url: string, _path: string = "", _params: object = {}) => {
  path = _path;
  params = _params;
  return cos.deleteObject({
    Bucket: bucket,
    Region: region,
    Key: url,
  });
}

export const existFile = (url: string, _path: string = "", _params: object = {}) => {
  path = _path;
  params = _params;
  return new Promise <boolean>((resolve, reject) => {
    cos.headObject({
      Bucket: bucket,
      Region: region,
      Key: url,
    }, (err, data) => {
      if (data) {
        return resolve(true);
      } else if (err && err.statusCode === 404) {
        return resolve(false);
      } else if (err && err.statusCode === 403) {
        return reject('Unauthorized');
      }
    });
  })
}

export const listFile = (prefix: string, _path: string = "", _params: object = {}) => {
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