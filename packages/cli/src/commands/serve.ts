import path from "path";
import { Command } from "commander";
import {serve} from '@jsnotes-gab/local-api'

const isProduction = process.env.NODE_ENV === 'production'

export const serveCommand = new Command()
.command('serve [filename]')
.description('Open a file for editing')
.option('-p, --port <number>', 'port to run server on', '4005')
.action(async (fileName = 'notebook.js', options: {port: string})=> {
  try {
    const dir=  path.join(process.cwd(), path.dirname(fileName))
    await serve(parseInt(options.port) ,  path.basename(fileName), dir, !isProduction)
    console.log(
      `Opened ${fileName}, Navigate to http://localhost:${options.port} to edit the file`
    )
  } catch (error:any) {
    if(error.code === 'EADDRINUSE'){
      console.error('Port in use. Try running on a different port.');
    }else{
      console.log('here is the problem', error.message)
    }
    process.exit(1)
  }
})

 