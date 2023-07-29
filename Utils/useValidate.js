const err =  {}

export default function useValidate({nameValidate,emailValidate,passwordValidate}) {
  const {name,max_length,min_length} = nameValidate;
  const {email,emailString} = emailValidate;
  const {pass,confirmPass} = passwordValidate
   if(name){
     if (name.length === 0) err.name ="name cannot be blank";
     if (name.length >8) err.name ="name is too long"
   }
   if(email){
    if(!email || email.length === 0) err.email = "your email is required";
    if(email){}
   }

  return err
}
