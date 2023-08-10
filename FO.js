const helpModule=require('./commands/help')
const organizeModule=require('./commands/organize')
const treeModule=require('./commands/tree')


let input =process.argv.slice(2)



let command=input[0]

switch(command){
        case 'tree':
        treeModule.treeKey(input[1])
        break;
        case 'organize':
        organizeModule.organizeKey(input[1])
        break;
        case 'help':
        helpModule.helpKey()
        break;
        default:
        console.log('Please enter valid command')
}








