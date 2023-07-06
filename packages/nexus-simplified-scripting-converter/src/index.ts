const convertActions = (actions: client.Action[]) => {
    let result = ""

    for (const action of actions) {
        if(action.action === "script"){
            result += `{
  ${action.script}
}
`
        }else if(action.action === "function"){
            if(action.fn && action.fn.length > 0) {
                result += `nexusclient.reflexes().run_function("${action.fn}")\n`
            }
        }else if(action.action === "disable"){
            result += `{
  const reflex = nexusclient.reflexes().find_by_name("${action.type}", "${action.name}", true, false, current_package);
  if(!reflex){
    nexusclient.display_notice('Disable reflex: unable to find any ${action.type} called "${action.name}" in ' + (current_package?current_package:'global reflexes'), 'red');
  }else{
    nexusclient.reflexes().disable_reflex(reflex);
  }
}
`
        }
    }

    return result
}

const convertReflex = (reflex: client.Reflex) => {
    if(reflex.type === "group"){
        for (const item of reflex.items) {
            convertReflex(item)
        }
    }
}

const convertPackage = (pkg: client.Package) => {
    for (const item of pkg.items) {
        convertReflex(item)
    }
}

export {
    convertPackage,
    convertActions
}