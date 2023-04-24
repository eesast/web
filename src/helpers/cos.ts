import COS from "cos-js-sdk-v5";
import axios from 'axios';

let team_id = "-1";

const cos = new COS({
  getAuthorization: async (options: object, callback: Function) => {
    try {
      const response = await axios.get("/static", {
        params: {
          team_id: team_id
        }
      });
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

export const uploadFile = (file: any, location: string, ext: string = "-1") => {
  team_id = ext;
  return cos.uploadFile({
    Bucket: 'eesast-1255334966',
    Region: 'ap-beijing',
    Key: location.split('.').slice(0, -1).join('.'),  // location 去掉后缀名
    Body: file,
    SliceSize: 1024 * 1024 * 5  /* 触发分块上传的阈值，超过5MB使用分块上传，小于5MB使用简单上传。可自行设置，非必须 */
  });
}

export const downloadFile = (option: any, ext: string = "-1") => {
  team_id = ext;
  return new Promise ((resolve, reject) => {
    cos.getObjectUrl({
      Bucket: 'eesast-1255334966',
      Region: 'ap-beijing',
      Key: option.url,
    }, (err, data) => {
      if (err) return reject(err);
      const downloadUrl = data.Url + (data.Url.indexOf('?') > -1 ? '&' : '?') + 'response-content-disposition=attachment;filename=' + option.filename;
      window.open(downloadUrl);
      return resolve(data);
    });
  });
}

export const deleteFile = (location: string, ext: string = "-1") => {
  team_id = ext;
  return new Promise ((resolve, reject) => {
    cos.deleteObject({
      Bucket: 'eesast-1255334966',
      Region: 'ap-beijing',
      Key: location,
    }, (err, data) => {
      if (err) return reject(err);
      return resolve(data);
    });
  })
}

export const existFile = (key: string, ext: string = "-1") => {
  team_id = ext;
  return new Promise <boolean>((resolve, reject) => {
    cos.headObject({
      Bucket: 'eesast-1255334966',
      Region: 'ap-beijing',
      Key: key,
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

export const listFile = (prefix: string, ext: string = "-1") => {
  team_id = ext;
  return new Promise <COS.CosObject[]>((resolve, reject) => {
    cos.getBucket({
      Bucket: 'eesast-1255334966',
      Region: 'ap-beijing',
      Prefix: prefix,
    }, (err, data) => {
      if (err || !data) return reject(err);
      return resolve(data.Contents);
    });
  })
}
