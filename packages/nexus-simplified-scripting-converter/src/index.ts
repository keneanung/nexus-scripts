const convertActions = (actions: client.Action[]) => {
  let result = '';

  for (const action of actions) {
    if (action.action === 'script') {
      result += `{
  ${action.script}
}
`;
    } else if (action.action === 'function') {
      if (action.fn && action.fn.length > 0) {
        result += `nexusclient.reflexes().run_function("${action.fn}")\n`;
      }
    } else if (action.action === 'disable') {
      result += `{
  const reflex = nexusclient.reflexes().find_by_name("${action.type}", "${action.name}", true, false, current_package);
  if(!reflex){
    nexusclient.display_notice('Disable reflex: unable to find any ${action.type} called "${action.name}" in ' + (current_package?current_package:'global reflexes'), 'red');
  }else{
    nexusclient.reflexes().disable_reflex(reflex);
  }
}
`;
    } else if (action.action === 'enable') {
      result += `{
  const reflex = nexusclient.reflexes().find_by_name("${action.type}", "${action.name}", true, false, current_package);
  if(!reflex){
    nexusclient.display_notice('Enable reflex: unable to find any ${action.type} called "${action.name}" in ' + (current_package?current_package:'global reflexes'), 'red');
  }else{
    nexusclient.reflexes().enable_reflex(reflex);
  }
}
`;
    } else if (action.action === 'command'){
      /*
      args is the full match object for regex matches:
      {
      0: "test test",
      1: " test",
      groups: {foo: ' test'},
      index: 10,
      input: "this is a test test"
      }
      for begin of line and substring matches, it is null
*/
      result += `{
    let cmd = "${action.command}";
    if(args){
      const prefix = args.input.substr(0, args.index);
      const posend = args.index + args[0].length;
      const suffix = args.input.substr(posend);
      const replace = {};
      replace["match"] = args[0];
      replace["line"] = args.input;
      replace["prefix"] = prefix;
      replace["suffix"] = suffix;
      if(args.length > 1){
        for(let i = 1; i++; i < args.length){
          replace[i] = args[i];
        }
      }
      if(args.groups){
        for(const group in args.groups){
          replace[group] = args.groups[group];
        }
      }
      cmd = nexusclient.variables().expand(cmd, replace);

      ${action.prefix_suffix ? 
        `if(prefix){
        cmd = prefix + cmd;
      }
      if(suffix){
        cmd = cmd + suffix;
      }
`
        :""}
    }
    nexusclient.send_commands(cmd)
  }
  `
    }
  }

  return result;
};

const convertReflex = (reflex: client.Reflex) => {
  if (reflex.type === 'group') {
    for (const item of reflex.items) {
      convertReflex(item);
    }
  }
};

const convertPackage = (pkg: client.Package) => {
  for (const item of pkg.items) {
    convertReflex(item);
  }
};

export { convertPackage, convertActions };
