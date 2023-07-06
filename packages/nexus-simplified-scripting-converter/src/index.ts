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