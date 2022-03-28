interface httpError {
  message:string;
  status:number;
}

export default function exception(message:string, status=400):httpError {
  return { message:message, status:status }
}

export function verifyIfIsAnInternalException(err:any):httpError {
  if(!err.status)  {
    console.log(err)
    return exception('Houve um erro interno...', 500); 
  }
  return err;
}