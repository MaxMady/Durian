const data = require('../database/mine.js')   

function mine(ct) {
let ar = [];
        for(let i = 1; i <= 5;i++) {
            const rnd = Math.random() * 100000;
            const percent = rnd / 1000;
            let result = null,
              acc = 0;
    
            Object.keys(data.rarity).forEach((key) => {
              if (result === null && percent > 100 - data.rarity[key] - acc)
                result = key;
              acc += parseFloat(data.rarity[key]);
            });
            let m = 100;
            switch(result) {
              case 'Iron': {
                for(m;m >= 0;) {
                  m-=2
                  let chance = Math.random()*100;
                  if(m < chance) {
                    if(ar.length === 0) {
                      let obj = {
                        item:"Iron",
                        count: 1
                      }
                      ar.push(obj)
                    } else {
                        let x = ar.find(o => o.item === `Iron`)
                      if(!x) {
                        ar.push({
                            item:"Iron",
                            count: 1
                          })
                      } else {
                        x.count++;
                      }
                    }
                    
                  } else {
                  }
                }
                break;
              }
              //Bronzor
              case 'Bronze':{
                for(m;m >= 0;) {
                    m-=5
                    let chance = Math.random()*100;
                    if(m < chance) {
                      if(ar.length === 0) {
                        let obj = {
                          item:"Bronze",
                          count: 1
                        }
                        ar.push(obj)
                      } else {
                        let x = ar.find(o => o.item === `Bronze`)
                        if(!x) {
                            ar.push({
                                item:"Bronze",
                                count: 1
                              })
                          } else {
                            x.count++;
                          }
                      }
                      
                    } else {
                    }
                  }
                  break;
              }
              case 'Gold': {
                for(m;m >= 0;) {
                    m-=10
                    let chance = Math.random()*100;
                    if(m < chance) {
                      if(ar.length === 0) {
                        let obj = {
                          item:"Gold",
                          count: 1
                        }
                        ar.push(obj)
                      } else {
                        let x = ar.find(o => o.item === `Gold`)
                        if(!x) {
                            ar.push({
                                item:"Gold",
                                count: 1
                              })
                          } else {
                            x.count++;
                          }
                      }
                      
                    } else {
                    }
                  }
                  break;
              }
              case 'Emerald': {
                for(m;m >= 0;) {
                    m-=15
                    let chance = Math.random()*100;
                    if(m < chance) {
                      if(ar.length === 0) {
                        let obj = {
                          item:"Emerald",
                          count: 1
                        }
                        ar.push(obj)
                      } else {
                        let x = ar.find(o => o.item === `Emerald`)
                        if(!x) {
                            ar.push({
                                item:"Emerald",
                                count: 1
                              })
                          } else {
                            x.count++;
                          }
                      }
                      
                    } else {
                    }
                  }
                  break;
              }
              case 'Platinum': {
                for(m;m >= 0;) {
                    let chance = Math.random()*100;
                    m-=25
                    if(m+25 < chance) {
                      
                      if(ar.length === 0) {
                        let obj = {
                          item:"Platinum",
                          count: 1
                        }
                        ar.push(obj)
                      } else {
                        let x = ar.find(o => o.item === `Platinum`)
                        if(!x) {
                            ar.push({
                                item:"Platinum",
                                count: 1
                              })
                          } else {
                            x.count++;
                          }
                      }
                      
                    } else {
                    }
                  }
                  break;
              }
              case 'Diamond': {
                for(m;m >= 0;) {
                    let chance = Math.random()*100;
                    m-=35;
                    if(m+35 < chance) {
                      if(ar.length === 0) {
                        let obj = {
                          item:"Diamond",
                          count: 1
                        }
                        ar.push(obj)
                      } else {
                        let x = ar.find(o => o.item === `Diamond`)
                        if(!x) {
                            ar.push({
                                item:"Diamond",
                                count: 1
                              })
                          } else {
                            x.count++;
                          }
                      }
                      
                    } else {
                    }
                  }
                  break;
              }
              case 'Ruby': {
                for(m;m >= 0;) {
                    let chance = Math.random()*100;
                    m-=49
                    if(m+49 < chance) {
                      if(ar.length === 0) {
                        let obj = {
                          item:"Ruby",
                          count: 1
                        }
                        ar.push(obj)
                      } else {
                        let x = ar.find(o => o.item === `Ruby`)
                        if(!x) {
                            ar.push({
                                item:"Ruby",
                                count: 1
                              })
                          } else {
                            x.count++;
                          }
                      }
                      
                    } else {
                    }
                  }
                  break;
              }
            }

          }
          let tot = 0;
          ar.forEach(e => {
            let prc = data.value[e.item]
            tot += prc*e.count
          })
          let res = tot/10
     return [ar, res+res*ct/10]
     }
     let mei = 0;
     for(let i = 0; i<=5;i++) {
        let res = mine(i)
        mei+= res[1]
     }
     
     module.exports = mine;