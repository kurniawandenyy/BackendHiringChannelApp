const conn = require('../configs/connect')

module.exports = {
    getEngineer: (id)=>{
        return new Promise((resolve, reject)=>{
            conn.query(`Select * from engineers where id='${id}'`, (err, result)=>{
                if(err){
                    reject(new Error(err))
                }else{
                    resolve(result)
                }
            })
        })
    },
    getEngineers : (limit, offset, condition)=>{
        return new Promise((resolve, reject)=>{
            conn.query(`SELECT COUNT(*) as data from engineers ${condition}`, (err, rows)=>{
                let dataTotal = rows[0].data
                if(err){
                    resolve.json({
                        err
                    })
                }else{
                    conn.query(`SELECT * FROM engineers ${condition} limit ${offset}, ${limit}`, (err, data)=>{
                        if(err){
                            reject(new Error(err))
                        }else{
                            let result = {dataTotal, data}
                            resolve(result)
                        }
                    })
                } 
            })
        })
    },
    addEngineer : (data)=>{
        return new Promise((resolve, reject)=>{
            conn.query('INSERT INTO engineers set ?', data, (err)=>{
                if(err){
                    reject(new Error(err))
                }else{
                    let message = 'Data Added Successfully'
                    resolve(message)
                }
            })
        })
    },
    editEngineer : (data, id)=>{
        return new Promise((resolve, reject)=>{
            conn.query('SELECT * FROM engineers where id =?', id, (err, rows, fields)=>{
                if(err) throw err
                if(rows.length<=0){
                    let message = 'User not found'
                    reject(new Error(message))
                }else{
                    conn.query('UPDATE engineers set ? WHERE id = ?', [data,id], (err)=>{
                        if(!err){
                            let result = 'Data Updated Successfully'
                            resolve(result)
                        }else{
                            reject(new Error(err))
                        }
                    })
                }
            })
        })
    },
    deleteEngineer : (id)=>{
        return new Promise((resolve, reject)=>{
            conn.query('DELETE FROM engineers where id = ?', id, (err)=>{
                if(!err){
                    let result = 'Data Deleted Successfully'
                    resolve(result)
                }else{
                    reject(new Error(err))
                }
            })
        })
    }
}