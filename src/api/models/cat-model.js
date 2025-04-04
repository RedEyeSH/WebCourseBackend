// // mock data
// const catItems = [
//   {
//     cat_id: 9592,
//     cat_name: 'Frank',
//     weight: 11,
//     owner: 3609,
//     filename: 'f3dbafakjsdfhg4',
//     birthdate: '2021-10-12',
//   },
//   {
//     cat_id: 9590,
//     cat_name: 'Mittens',
//     weight: 8,
//     owner: 3602,
//     filename: 'f3dasdfkjsdfhgasdf',
//     birthdate: '2021-10-12',
//   },
// ];

// const listAllCats = () => {
//   return catItems;
// };

// const findCatById = (id) => {
//   return catItems.find((item) => item.cat_id == id);
// };

// const addCat = (cat) => {
//   const {cat_name, weight, owner, filename, birthdate} = cat;
//   const newId = catItems[0].cat_id + 1;
//   catItems.unshift({cat_id: newId, cat_name, weight, owner, filename, birthdate});
//   return {cat_id: newId};
// };

// export {listAllCats, findCatById, addCat};

import promisePool from '../../utils/database.js';

const listAllCats = async () => {
    const [rows] = await promisePool.query('SELECT * FROM wsk_cats');
    console.log('rows', rows);
    return rows;
};

const findCatById = async (id) => {
    const [rows] = await promisePool.execute('SELECT * FROM wsk_cats WHERE cat_id = ?', [id]);
    console.log('rows', rows);
     if (rows.length === 0) {
        return false;
     }
     return rows[0];
};

const addCat = async (cat) => {
  const {cat_name, weight, owner, filename, birthdate} = cat;
  const sql = `INSERT INTO wsk_cats (cat_name, weight, owner, filename, birthdate)
               VALUES (?, ?, ?, ?, ?)`;
  const params = [cat_name, weight, owner, filename, birthdate];
    const rows = await promisePool.execute(sql, params);
    console.log('rows', rows);
     if (rows[0].affectedRows === 0) {
        return false;
     }
    return {cat_id: rows[0].insertId};
};

const modifyCat = async (cat, id) => {
  const sql = promisePool.format(`UPDATE wsk_cats SET ? WHERE cat_id = ?`, [cat, id]);
    const rows = await promisePool.execute(sql);
    console.log('rows', rows);
     if (rows[0].affectedRows === 0) {
        return false;
     }
     return {message: 'success'};
};

const removeCat = async (id) => {
    const [rows] = await promisePool.execute('DELETE FROM wsk_cats WHERE cat_id = ?', [id]);
    console.log('rows', rows);
     if (rows.affectedRows === 0) {
        return false;
     }
     return {message: 'success'};
};

const findCatByOwnerId = async (ownerId) => {
  const [rows] = await promisePool.execute('SELECT * FROM wsk_cats WHERE owner = ?', [ownerId]);
  console.log('rows', rows);
  if (rows.affectedRows === 0) {
    return false;
  }
  return {message: 'success'};
};

export {listAllCats, findCatById, addCat, modifyCat, removeCat, findCatByOwnerId};
