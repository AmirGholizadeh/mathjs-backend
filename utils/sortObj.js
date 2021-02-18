/**
 * @description create an object out of the queries for $sort ing
 * @param {string} sort get from req.query.sort
 * @returns {object} an object suited for $sort 
 */

module.exports = (sort) => {
    let sortObj = {}
    sort.split(',').forEach(el => {
       const keyAndValue = el.split(':');
       sortObj[keyAndValue[0]] = Number(keyAndValue[1]);
   })    
   return sortObj;
};
