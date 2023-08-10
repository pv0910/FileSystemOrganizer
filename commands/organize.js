const fs=require('fs')
const path=require('path')

let types = {
    media: ["mp4", "mkv", "mp3"],
    archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
    documents: ["docx","doc","pdf","xlsx","xls","odt","ods","odp","odg","odf","txt","ps","tex",],
    app: ["exe", "dmg", "pkg", "deb"],
};

function organizeFn(dirpath){
    let despath
    if(dirpath==undefined)
    {
        console.log('Please Enter a valid Directory Path')
        return;
    }
    else{
        let doesExist=fs.existsSync(dirpath)
        // console.log(doesExist)

        if(doesExist==true)
        {
            despath=path.join(dirpath,"organized_files")

            if(fs.existsSync(despath)===false)
            {
                fs.mkdirSync(despath);
            }
            else{
                console.log('this folder already exixts')
            }
        }
        else{
            console.log('Please enter valid path')
        }

    }
    organizeHelper(dirpath,despath)
}


function organizeHelper(src,dest){
    
    
    let childNames = fs.readdirSync(src)
        // console.log(childNames)
    for(let i=0;i<childNames.length;i++)
    {
        let childAddress=path.join(src,childNames[i])
        let isFile=fs.lstatSync(childAddress).isFile()
        // console.log(childAddress+" "+isFile)
        
        if(isFile==true)
        {
        let fileCategory=getCategory(childNames[i])
        console.log(childNames[i]+" belongs to "+fileCategory)
            sendFiles(childAddress,dest,fileCategory)
        }
    }

}

function getCategory(name)
{
    let ext =path.extname(name)
    ext=ext.slice(1)
    // console.log(ext)

    for (let type in types)
    {
        let cTypeArr = types[type]

        for(let i=0;i<cTypeArr.length;i++)
        {
            if(ext==cTypeArr[i])
            return type;
            
        }
    }    
    return 'other'
}

function sendFiles(srcFilePath,dest,fileCategory){
    let catPath =path.join(dest,fileCategory)

    if(fs.existsSync(catPath)==false){
        fs.mkdirSync(catPath)
    }

    let fileName=path.basename(srcFilePath)
    let destFilePath=path.join(catPath,fileName)

    fs.copyFileSync(srcFilePath,destFilePath)

    fs.unlinkSync(srcFilePath)

    console.log(fileName+"is copied to"+fileCategory)

}
module.exports={
    organizeKey:organizeFn
}