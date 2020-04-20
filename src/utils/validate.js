export function notNull(rule, value, callback) {
  if (!value) {
    callback(new Error("不能为空"))
  }
}

//验证是否是整数
export function isInteger(rule, value, callback) {
  if (!value) {
    callback();
  }
  setTimeout(() => {
    if (!Number(value)) {
      callback(new Error("请输入正整数"));
    } else {
      const re = /^[0-9]*[1-9][0-9]*$/;
      const rsCheck = re.test(value);
      if (!rsCheck) {
        callback(new Error("请输入正整数"));
      } else {
        callback();
      }
    }
  }, 1000)
}

//手机号
export function validatePhone(rule, value, callback) {
  const reg = /^[1][3-9][0-9]{9}$/;
  if (value == '' || value == undefined || value == null) {
    callback();
  } else {
    if ((!reg.test(value)) && value != '') {
      callback(new Error('请输入正确的电话号码'));
    } else {
      callback();
    }
  }
}

//邮箱
export function validateEMail(rule, value, callback) {
  const reg = /^([a-zA-Z0-9]+[-_\.]?)+@[a-zA-Z0-9]+\.[a-z]+$/;
  if (value == '' || value == undefined || value == null) {
    callback();
  } else {
    if (!reg.test(value)) {
      callback(new Error('请输入正确的邮箱'));
    } else {
      callback();
    }
  }
}

//合法的url
export function validateURL(url) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  return urlregex.test(url);
}

//是否包含英文数字以及下划线
export function isPassword(rule, value, callback) {
  const reg = /^[_a-zA-Z0-9]+$/;
  if (value == '' || value == undefined || value == null) {
    callback();
  } else {
    if (!reg.test(value)) {
      callback(new Error('仅由英文字母，数字以及下划线组成'));
    } else {
      callback();
    }
  }
}

//最多一位小数
const onePoint = (rule, value, callback) => {
  if (!/^[0-9]+([.]{1}[0-9]{1})?$/.test(value)) {
    callback(new Error('最多一位小数！！！'));
  } else {
    callback();
  }
};
//最多两位小数
const validateValidity = (rule, value, callback) => {
  if (!/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/.test(value)) {
    callback(new Error('最多两位小数！！！'));
  } else {
    callback();
  }
};

//判断是否是大写字母
export function validateUpperCase(val) {
  const reg = /^[A-Z]+$/;
  return reg.test(val);
}

//判断是否是小写字母
export function validateLowerCase(val) {
  const reg = /^[a-z]+$/;
  return reg.test(val);
}

//判断是否是大小写字母
export function validatAlphabets(val) {
  const reg = /^[A-Za-z]+$/;
  return reg.test(val);
}

//中文校验
export const validateContacts = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('请输入中文'))
  }
  if (!/^[\u0391-\uFFE5A-Za-z]+$/.test(value)) {
    callback(new Error('不可输入特殊字符'))
  } else {
    callback()
  }
}
//身份证校验
export const ID = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('身份证不能为空'))
  }
  if (!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value)) {
    callback(new Error('请输入正确的二代身份证号码'))
  } else {
    callback()
  }
}
//纯数字校验
export const validateNumber = (rule, value, callback) => {
  let numberReg = /^\d+$|^\d+[.]?\d+$/
  if (value !== '') {
    if (!numberReg.test(value)) {
      callback(new Error('请输入数字'))
    } else {
      callback()
    }
  } else {
    callback(new Error('请输入值'))
  }
}

//1-99之间的数
export function isOneToNinetyNine(rule, value, callback) {
  if (!value) {
    return callback(new Error('输入不可以为空'));
  }
  setTimeout(() => {
    if (!Number(value)) {
      callback(new Error('请输入正整数'));
    } else {
      const re = /^[1-9][0-9]{0,1}$/;
      const rsCheck = re.test(value);
      if (!rsCheck) {
        callback(new Error('请输入正整数，值为【1,99】'));
      } else {
        callback();
      }
    }
  }, 0);
}
