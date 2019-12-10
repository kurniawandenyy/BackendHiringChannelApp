const conn = require('../configs/connect')

module.exports = {
    getCompanies: ()=>{
        return new Promise((resolve, reject)=>{
            conn.query("SELECT * FROM company", (err, result)=>{
                if(!err){
                    resolve(result)
                }else{
                    reject(new Error(err))
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
            conn.query('SELECT * FROM company where id=?', id, (err, rows, fields)=>{
                if(err) reject(new Error(err))
                if(rows.length<=0){
                    reject(new Error('User Not Found'))
                }else{
                    conn.query('DELETE from company where id=?', id, (err)=>{
                        if(!err){
                            let result='Data Deleted Successfully'
                            resolve(result)
                        }else{
                            reject(new Error(err))
                        }
                    })
                }
            })
        })
    }
}