const LABEL_FOR_SECOND_RANGE = '~'; //метка, которая добавляется при кодировании к символам, соответствующим числам > 125 и < 251 
const LABEL_FOR_THIRD_RANGE = '⌂'; //метка, которая добавляется при кодировании к символам, соответствующим числам >= 251 и <= 300 

const serialize = (array) => {
  let serializedString = '';
  array.forEach(element => {
    if (element > 0 && element <= 125) {
      let serializedElement = String.fromCharCode(element);
      serializedString += serializedElement;
    } else if (element > 125 && element < 251) {
      let serializedElement = String.fromCharCode(element - 125);
      serializedString += LABEL_FOR_SECOND_RANGE + serializedElement;
    } else if (element >= 251 && element <= 300) {
      let serializedElement = String.fromCharCode(element - 250);
      serializedString += LABEL_FOR_THIRD_RANGE + serializedElement;
    }
  });

  return serializedString;
}

const deserialize = (serializedString) => {
  let deserializedArray = [];
  let i = 0;
  while (i < serializedString.length) {
    if (serializedString[i] != '~' && serializedString[i] != '⌂') {
      let deserializedElement = (serializedString[i]).charCodeAt();
      deserializedArray.push(deserializedElement);
      i += 1;
    } else if (serializedString[i] === '⌂') {
      let deserializedElement = (serializedString[i + 1]).charCodeAt() + 250;
      deserializedArray.push(deserializedElement);
      i += 2;
    } else if (serializedString[i] === '~') {
      let deserializedElement = (serializedString[i + 1]).charCodeAt() + 125;
      deserializedArray.push(deserializedElement);
      i += 2;
    }
  }

  return deserializedArray;
}

const getCompressionPercent = (arr, result) => {
  const arrayLength = JSON.stringify(arr).length;
  console.log(`Длина символов исходного массива: ${arrayLength}`);
  const resultLength = result.length;
  console.log(`Длина строки результата: ${resultLength}`);
  console.log(`Сжатие массива составляет ${(1 - resultLength / arrayLength) * 100} %`);
}

module.exports = {
  serialize, deserialize, getCompressionPercent
};