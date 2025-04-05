// const userItems = [
//   {
//     user_id: 3609,
//     name: 'John Doe',
//     username: 'johndoe',
//     email: 'john@metropolia.fi',
//     role: 'user',
//     password: 'password',
//   },
//   {
//     user_id: 3612,
//     name: 'Alice Smith',
//     username: 'alicesmith',
//     email: 'alice.smith@metropolia.com',
//     role: 'admin',
//     password: 'password',
//   }
// ];

// const listAllUsers = () => {
//   return userItems;
// };

// const findUserById = (id) => {
//   return userItems.find((item) => item.user_id == id);
// };

// const addUser = (user) => {
//   const {name, username, email, role, password} = user;
//   const newId = userItems[0].user_id + 1;
//   userItems.unshift({user_id: newId, name, username, email, role, password});
//   return {user_id: newId};
// };

// export {listAllUsers, findUserById, addUser};

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

const listAllUsers = async () => {
  const [rows] = await promisePool.execute('SELECT * FROM wsk_users');
  console.log('rows', rows);
  return rows;
};

const findUserById = async (id) => {
  const [rows] = await promisePool.execute(
    'SELECT * FROM wsk_users WHERE user_id = ?',
    [id]
  );
  console.log('rows', rows);
  if (rows.length === 0) {
    return false;
  }
  return rows[0];
};

const addUser = async (user) => {
  const {name, username, password, email} = user;
  const sql = `INSERT INTO wsk_users (name, username, password, email)
               VALUES (?, ?, ?, ?)`;
  const params = [name, username, password, email];
  const rows = await promisePool.execute(sql, params);
  console.log('rows', rows);
  if (rows[0].affectedRows === 0) {
    return false;
  }
  return {user_id: rows[0].insertId};
};

const modifyUser = async (user, id) => {
  const sql = promisePool.format(`UPDATE wsk_users SET ? WHERE user_id = ?`, [
    user,
    id,
  ]);
  const rows = await promisePool.execute(sql);
  console.log('rows', rows);
  if (rows[0].affectedRows === 0) {
    return false;
  }
  return {message: 'success'};
};

const removeUser = async (id) => {
  const connection = await promisePool.getConnection();
  try {
    await connection.beginTransaction();

    await connection.execute('DELETE FROM wsk_cats WHERE owner = ?', [id]);
    const [result] = await connection.execute(
      'DELETE FROM wsk_users WHERE user_id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return {message: 'User not found'};
    }

    await connection.commit();
    return {message: 'success'};
  } catch (error) {
    await connection.rollback();
    console.error('Transaction rolled back due to error:', error);
    return {message: 'Transaction failed'};
  } finally {
    connection.release();
  }
};

export {listAllUsers, findUserById, addUser, modifyUser, removeUser};
