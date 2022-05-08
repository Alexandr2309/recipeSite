export const LZW = {
  compress: function (uncompressed) {
    "use strict";

    var i, l,
      dictionary = {},
      w = '', k, wk,
      result = [],
      dictSize = 256;

    // initial dictionary
    for (i = 0; i < dictSize; i++) {
      dictionary[String.fromCharCode(i)] = i;
    }

    for (i = 0, l = uncompressed.length; i < l; i++) {
      k = uncompressed.charAt(i);
      wk = w + k;
      if (dictionary.hasOwnProperty(wk)) {
        w = wk;
      }
      else {
        result.push(dictionary[w]);
        dictionary[wk] = dictSize++;
        w = k;
      }
    }

    if (w !== '') {
      result.push(dictionary[w]);
    }

    result.dictionarySize = dictSize;
    return result;
  },
  formatCompress: (img) => {
    let data = img;
    var type = data.dictionarySize > 65535 ? 'Uint32Array' : 'Uint16Array',
      count = data.length,
      buffer = new ArrayBuffer((count + 2) * window[type].BYTES_PER_ELEMENT),
      // по первому байту будем определять тип массива
      bufferBase = new Uint8Array(buffer, 0, 1),
      // для оптимизации распаковки на сервере передадим итоговый размер словаря LZW
      bufferDictSize = new window[type](buffer, window[type].BYTES_PER_ELEMENT, 1),
      bufferData = new window[type](buffer, window[type].BYTES_PER_ELEMENT * 2, count);

    bufferBase[0] = type === 'Uint32Array' ? 32 : 16; // записываем тип массива
    bufferDictSize[0] = data.dictionarySize; // записываем размер словаря LZW
    bufferData.set(data); // записываем данные

    data = new Blob([buffer], {type: 'image/png'});

    return data
  }
};


