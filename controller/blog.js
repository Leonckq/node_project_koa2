const xss = require('xss')
const { exec } = require('../db/mysql')


const getList = async (author, keyword) => {
  let sql = `select * from blogs where 1=1 `
  if (author) {
    sql += `and author='${author}' `
  }
  if (keyword) {
    sql += `and title like '%${keyword}%' `
  }
  sql += 'order by createtime desc;'
  //返回promise
  return await exec(sql)
}

const getDetail = async (id) => {
  let sql = `select * from blogs where id='${id}'`
  const rows = await exec(sql)
  return rows[0]
}

const newBlog = async (blogData = {}) => {
  // blogData 是一个博客对象， 包含title， content， author属性
  const { title, content, author } = blogData
  const createTime = Date.now()
  const newTitle = xss(title)
  const sql = `
    insert into blogs (title, content, author, createtime)
    values
    ('${newTitle}', '${content}', '${author}', ${createTime});
  `
  const insertData = await exec(sql)
  return {
    id: insertData.insertId
  }
}

const updateBlog = async (id, blogData = {}) => {
  // id = Number(id)
  const { title, content } = blogData
  const sql = `
    update blogs set title='${title}', content='${content}' where id=${id};
  `
  const updateData = await exec(sql)
  if (updateData.affectedRows > 0) {
    return true
  }
  return false
}

const delBlog = (id, author) => {
  // const sql = `
  //   delete from blogs where id=${Number(id)} and author='${author}';
  // `
  const sql = `
    delete from blogs where id=${Number(id)};
  `
  const deleteData = exec(sql)
  if (deleteData.affectedRows > 0) {
    return true
  }
  return false
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}