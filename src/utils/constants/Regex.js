// pmc id regex
export const pmcIdRegex = /([0-9]{1,5}\-[D|B|F|N|P|S]{1})/gm;

//email regex
export const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gm;

//password regex
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/gm;

//string regex
export const stringRegex = /^[a-zA-Z ]*$/gm;

//number regex
export const numberRegex = /^[0-9]*$/gm;

//phone number regex
export const phoneNumberRegex = /^(\+)([0-9]{1,4})(\-)([0-9]{9,12})$/gm;
