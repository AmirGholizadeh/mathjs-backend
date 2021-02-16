module.exports = (sort) => {
    let sortObj = {}
    sort.split(',').forEach(el => {
       const keyAndValue = el.split(':');
       sortObj[keyAndValue[0]] = Number(keyAndValue[1]);
   })    
   return sortObj;
};
