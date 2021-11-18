export default class Utils {
    static random(min,max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min); 
      
    }

    static sleep(ms) {
        return new Promise((resolve) => {
          setTimeout(resolve, ms);
        });
    }

    static bytes(str) {
        var len = str.length;
        var bytes = len;
        for (var i = 0; i < len; i++) {
            if (str.charCodeAt(i) > 255) bytes++;
        }
        return bytes;
    }

    static groupBy(objectArray, property) {
        return objectArray.reduce(function (acc, obj) {
          var key = obj[property];
          if (!acc[key]) {
            acc[key] = [];
          }
          acc[key].push(obj);
          return acc;
        }, {});
      }
}