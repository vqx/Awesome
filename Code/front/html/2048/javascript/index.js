var Direction ={
    Up:0,
    Down:1,
    Left:2,
    Right:3
};
var Game = {
    MoveCount:0,
    Score:0,
    Data:[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]],
    Init:function(){
        this.NewBlock(0);
        this.NewBlock(0);
        var str = ""
        for(var i in this.Data){
               for(var j in this.Data[i]){
                        var value = "" + this.Data[i][j]
                        if(this.Data[i][j] == 0){
                            value = ""
                        }
                        str+="<div id='block+" + i + "" + j + "' class='block' >" + value + "</div>"
               }
        }
        document.getElementById("mainPanel").innerHTML=str
    },
    ResetGame:function(){
        this.Data=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]
    },
    RemoveBlank:function(dir){
        var flag = false
        var slice = this.Data
        switch (dir){
        case Direction.Up:
            for(var j = 0;j < 4;j++){
                for(var i = 0;i < 3;i++){
                     if(slice[i][j]!=0)
                        continue;
                     for(var k=i+1;k<4;k++){
                        if (slice[k][j]==0){
                            continue
                        }
                        flag=true
                        slice[i][j] = slice[k][j]
                        slice[k][j] = 0
                        break
                     }
                }
            }
            break;
        case Direction.Down:
            for(var j = 0;j < 4;j++){
                for(var i = 3;i >=1;i--){
                     if(slice[i][j]!=0)
                        continue;
                     for(var k=i-1;k>=0;k--){
                        if (slice[k][j]==0){
                            continue
                        }
                        flag=true
                        slice[i][j] = slice[k][j]
                        slice[k][j] = 0
                        break
                     }
                }
            }
            break;
        case Direction.Left:
            for(var i = 0;i < 4;i++){
                for(var j = 0;j < 3;j++){
                     if(slice[i][j]!=0)
                        continue;
                     for(var k=j+1;k<4;k++){
                        if (slice[k][j]==0){
                            continue
                        }
                        flag=true
                        slice[i][j] = slice[i][k]
                        slice[i][k] = 0
                        break
                     }
                }
            }
            break;
        case Direction.Right:
            for(var i = 0;i < 4;i++){
                for(var j = 3;j >= 1;j--){
                     if(slice[i][j]!=0)
                        continue;
                     for(var k=j-1;k >= 0;k--){
                        if (slice[k][j]==0){
                            continue
                        }
                        flag=true
                        slice[i][j] = slice[i][k]
                        slice[i][k] = 0
                        break
                     }
                }
            }
            break;
        default:
            break;
        }
        this.Data = slice
        return flag
    },
    MergeBlock:function(dir){
        var flag = false
        var slice = this.Data
        switch (dir){
        case Direction.Up:
            for(var j = 0;j < 4;j++){
                for(var i = 3;i >=1 ;i--){
                     if(slice[i][j]==0)
                        continue;
                     for(var k = i - 1; k >= 0; k--){
                            if(slice[k][j]==0)
                                continue;
                            if(slice[k][j]!=slice[i][j])
                                break;
                            if(slice[k][j]==slice[i][j]){
                                slice[i][j]*=2
                                slice[k][j]=0
                                flag = true
                                break;
                            }
                     }
                }
            }
            break;
        case Direction.Down:
            for(var j = 0;j < 4;j++){
                for(var i = 0;i< 3 ;i++){
                     if(slice[i][j]==0)
                        continue;
                     for(var k = i +1; k<4; k++){
                            if(slice[k][j]==0)
                                continue;
                            if(slice[k][j]!=slice[i][j])
                                break;
                            if(slice[k][j]==slice[i][j]){
                                slice[i][j]*=2
                                slice[k][j]=0
                                flag = true
                                break;
                            }
                     }
                }
            }
            break;
        case Direction.Left:
            for(var i = 0;i < 4;i++){
                for(var j = 0;j< 3 ;j++){
                     if(slice[i][j]==0)
                        continue;
                     for(var k = j +1;k<4;k++){
                            if(slice[i][k]==0)
                                continue;
                            if(slice[i][j]!=slice[i][k])
                                break;
                            if(slice[i][k]==slice[i][j]){
                                slice[i][j]*=2
                                slice[i][k]=0
                                flag = true
                                break;
                            }
                     }
                }
            }
            break;
        case Direction.Right:
            for(var i = 0;i < 4;i++){
                for(var j = 3;j >= 1 ;j--){
                     if(slice[i][j]==0)
                        continue;
                     for(var k = j - 1;k<4;k--){
                            if(slice[i][k]==0)
                                continue;
                            if(slice[i][j]!=slice[i][k])
                                break;
                            if(slice[i][k]==slice[i][j]){
                                slice[i][j]*=2
                                slice[i][k]=0
                                flag = true
                                break;
                            }
                     }
                }
            }
            break;
        default:
            break;
        }
        this.Data = slice
        return flag
    },
    NewBlock:function(val){
        if(this.EndCheck())
            this.EndForm();
        var slice = this.Data
        if(!val){
            val = 0
        }
        if(val == 0){
            var n = Math.floor(Math.random()*10);
            if(n != 8) {
                val = 2
            }else {
                val = 4
            }
        }
        var zeroSlice = []
        var index = 0
        for(var i=0;i<4;i++)
                for(var j=0;j<4;j++){
                    if(slice[i][j] == 0){
                        var obj ={}
                        obj.X=i
                        obj.Y=j
                        zeroSlice[index]=obj
                        index++
                    }
                }
         var n = Math.floor(Math.random()*zeroSlice.length);
         if(zeroSlice[n]){
            console.log("error")
         }
         if(slice[zeroSlice[n].X][zeroSlice[n].Y] != 0){
            this.NewBlock(n)
         }
         slice[zeroSlice[n].X][zeroSlice[n].Y] = val
         this.Data = slice
    },
    EndCheck:function(){
        var slice = this.Data;
        for(var i=0;i<4;i++)
            for(var j=0;j<4;j++){
                if(slice[i][j] == 0){
                    return false;
                }
                if(i!=0){
                    if(slice[i][j]==slice[i-1][j]){
                        return false
                    }
                }
                if(i!=3){
                    if(slice[i][j]==slice[i+1][j]){
                        return false
                    }
                }
                if(j!=0){
                    if(slice[i][j]==slice[i][j-1]){
                        return false
                    }
                }
                if(j!=3){
                    if(slice[i][j]==slice[i][j+1]){
                        return false
                    }
                }
        }
        return true
    },
    EndForm:function(){
        var isAgain=confirm("Game Over!!!  Play again?");
        if(isAgain){
            this.ResetGame()
            this.Init()
        } else {
            alert("If you want to play later, you can reload this page to play.")
        }
    },
    RefreshUI:function (dir){
        var str = ""
        for(var i in this.Data){
            for(var j in this.Data[i]){
                var value = "" + this.Data[i][j]
                if(this.Data[i][j] == 0){
                    value = ""
                }
                str+="<div id='block+" + i + "" + j + "' class='block' >" + value + "</div>"
            }
        }
        document.getElementById("mainPanel").innerHTML=str
    },
};
Game.Init()
document.onkeyup = function(e){
    var currKey=0,e=e||event;
    currKey = e.keyCode || e.which || e.charCode;
    var keyName = String.fromCharCode(currKey);
    var flag = true
    var dir = Direction.Up
    switch(keyName){
    case "W":
        dir = Direction.Up;
        break;
    case "A":
       dir = Direction.Left;
        break;
    case "S":
        dir = Direction.Down;
        break;
    case "D":
        dir = Direction.Right;
        break;
    default:
        flag = false
        break;
    }
    if(!flag)
        return;
    var flag =Game.RemoveBlank(dir)
    flag = Game.MergeBlock(dir)||flag
    flag = Game.RemoveBlank(dir)||flag
    if(flag){
        Game.NewBlock()
    }
    Game.RefreshUI()
    if(Game.EndCheck())
        Game.EndForm()
};

/*
Game.ResetGame()
*/