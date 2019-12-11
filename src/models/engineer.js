const conn = require('../configs/connect')

module.exports = {
    getEngineers : (limit, offset, page, sort)=>{
        return new Promise((resolve, reject)=>{
            conn.query('SELECT COUNT(*) as data from engineer', (err, rows)=>{
                let dataTotal = rows[0].data
                let nextPage = page + 1
                let prevPage = page - 1
                let pageTotal = dataTotal%limit===0?dataTotal/limit:Math.floor((dataTotal/limit)+1)
                if(page>pageTotal || page===0){
                    let er = '404 Page Not Found!'
                    reject(new Error(er))
                }else{
                    if(err){
                        reject(new Error(err))
                    }else{
                        conn.query('SELECT * from engineer order by '+sort+' desc limit ? offset ?', [limit, offset], (err, data) => {
                            if(err){
                               reject(new Error(err))
                            }else{
                                let result = {}
                                if(page===1&&pageTotal!==1){
                                    result = {data, page, nextPage, limit, dataTotal, pageTotal}
                                }else if(page===pageTotal&&pageTotal!==1){
                                    result = {data, page, prevPage,limit, dataTotal, pageTotal}
                                }else if(pageTotal===1){
                                    result ={data, page, limit, dataTotal, pageTotal}
                                }else{
                                    result = {data, page, nextPage, prevPage, limit, dataTotal, pageTotal}
                                }
                                resolve(result)
                            }
                        })
                    }
                }
            })
        })
    },
    addEngineer : (data)=>{
        return new Promise((resolve, reject)=>{
            conn.query('INSERT INTO engineer set ?', data, (err)=>{
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
            conn.query('SELECT * FROM engineer where id =?', id, (err, rows, fields)=>{
                if(err) throw err
                if(rows.length<=0){
                    let message = 'User not found'
                    reject(new Error(message))
                }else{
                    conn.query('UPDATE engineer set ? WHERE id = ?', [data,id], (err)=>{
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
            conn.query('DELETE FROM engineer where id = ?', id, (err)=>{
                if(!err){
                    let result = 'Data Deleted Successfully'
                    resolve(result)
                }else{
                    reject(new Error(err))
                }
            })
        })
    },
    searchEngineer : (name, skill)=>{
        return new Promise((resolve, reject)=>{
            if(!name){
                conn.query("SELECT * FROM engineer where skill like '%"+skill+"%'", (err, result)=>{
                    if(err){
                        reject(new Error(err))
                    }else{
                        resolve(result)
                    }
                })
            }else if(!skill){
                conn.query("SELECT * FROM engineer where name like '%"+name+"%'", (err, result)=>{
                    if(err){
                        reject(new Error(err))
                    }else{
                        resolve(result)
                    }
                })
            }else{
                conn.query("SELECT * FROM engineer where name like '%"+name+"%' or skill like '%"+skill+"%'", (err, result)=>{
                    if(err){
                        reject(new Error(err))
                    }else{
                        resolve(result)
                    }
                })
            }
        })
    }
    // sortEngineers : (sort)=>{
    //     return new Promise((resolve, reject)=>{
    //         conn.query('SELECT * FROM engineer order by '+sort+' desc', (err, result)=>{
    //             if(err){
    //                 reject(new Error(err))
    //             }else{
    //                 resolve(result)
    //             }
    //         })
    //     })
    // }
}