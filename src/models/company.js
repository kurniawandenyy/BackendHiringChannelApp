const conn = require('../configs/connect')

module.exports = {
    getCompany: (id) => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT * From company where id='${id}'`, (err, result) =>{
                if(err){
                    reject(new Error(err))
                }else{
                    resolve(result)
                }
            })
        })
    },
    getCompanies: (limit, offset, condition)=>{
        return new Promise((resolve, reject)=>{
            conn.query(`SELECT COUNT(*) as data from company ${condition}`, (err, rows)=>{
                let dataTotal=rows[0].data
                if(err){
                    reject(new Error(err))
                }else{
                    conn.query(`SELECT * FROM company ${condition} limit ${offset}, ${limit}`, (err, data)=>{
                        if(!err){
                            let result = {dataTotal, data}
                            resolve(result)
                        }else{
                            reject(new Error(err))
                        }
                    })
                }
            })
        })
    },
    addCompany: (data)=>{
        return new Promise((resolve, reject)=>{
            conn.query('INSERT INTO company set ?', data, (err)=>{
                if(!err){
                    let result='Data Added Successfully'
                    resolve(result)
                }else{
                    reject(new Error(err))
                }
            })
        })
    },
    editCompany: (data, id)=>{
        return new Promise((resolve, reject)=>{
            conn.query('SELECT * FROM company where id=?', id, (err, rows, fields)=>{
                if(err) reject(new Error(err))
                if(rows.length<=0){
                    reject(new Error('User Not Found'))
                }else{
                    conn.query('UPDATE company set ? where id=?', [data, id], (err)=>{
                        if(!err){
                            let result='Data Updated Successfully'
                            resolve(result)
                        }else{
                            reject(new Error(err))
                        }
                    })
                }
            })
        })
    },
    deleteCompany: (id)=>{
        return new Promise((resolve, reject)=>{
            conn.query('DELETE FROM company where id = ?', id, (err)=>{
                if(!err){
                    conn.query('DELETE FROM users where id = ?', id, (err)=>{
                        if(!err){
                            let result = 'Data Deleted Successfully'
                            resolve(result)
                        }
                    })
                }else{
                    reject(new Error(err))
                }
            })
        })
    }
}