function RenameTransformationBySubstitution() {

    /*This script 
    take the _read that is selected, 
    get his current substition name(_read) DOOOONE
    function getDeformer = select the deformer that is just above in the hierarchie of the read(_read)
    function find_t_name = then get the current transformation name (deformer)
    and rename it by the current (_substitution name)

    then if i'm awesome, it will do that on all the key in timeline (loop)

    then if i'm really really cool, it will do that on several drawings/transformation (loop / if else for the reads that don't have deformation chain)
*/

    // Key.String.Drawing.name(int elementld, int drawingIndex) leementld serai l'id unique de l'élément ?

    var SelectedRead =selection.selectedNode(0)
    var SelectedReadName = node.getName(SelectedRead)
    var CurrentFrame = Timeline.firstFrameSel

    //MessageLog.trace("Tu as sélectionné " + SelectedReadName + " à la frame "+ CurrentFrame)

    var CurrentSubName = FSH_get_exposed_sub(SelectedRead,CurrentFrame)
    //MessageLog.trace("La substitution actuelle est "+ CurrentSub)
    

    //get the transformation switch attributes
    var DefGroup = get_Deformation_path(SelectedRead) 

    TransSwitch = DefGroup + "/Transformation-Switch"
    MessageLog.trace(TransSwitch)


    var TransSwitchAttr = FSH_show_attributes(TransSwitch,CurrentFrame)

    MessageLog.trace(TransSwitchAttr)

/*

    SetCurrentTransformationName(CurrentSubName)


    //MessageLog.trace("You have succesfully renamed deformer with \n"+ CurrentSubName )

*/
}

function get_Deformation_path(_node) {
    var NodeName = node.getName(_node)
    var PathDefGroup = _node.split(NodeName).join("Deformation-" + NodeName)
    //MessageLog.trace("Le chemin du déformeur lié au drawing sélectionné est " + PathDefGroup)
    return PathDefGroup
}


function FSH_get_exposed_sub(_node,_frame){
    
    //MessageLog.trace("FSH_get_exposed_sub ("+_node+") ("+_frame+")")
    // return all the name of the exposed sub at a frame
    const aframe = _frame != undefined ? _frame : frame.current()
    if(node.type(_node)!="READ"){
        //MessageLog.trace("Error node "+_node+" is not a READ ")
        return 
    }
    var previously_selected_nodes = selection.selectedNodes()
    selection.clearSelection()
    selection.addNodeToSelection(_node)
    var readcol = Timeline.selToColumn(0);
    var sub_name = column.getEntry(readcol,1,aframe);
    selection.clearSelection()
    selection.addNodesToSelection(previously_selected_nodes)
    //MessageLog.trace("return ("+sub_name+")")
    return sub_name
}

    
function FSH_show_attributes(_node,_frame){
    const aframe = _frame != undefined ? _frame : frame.current()
    var table = []
    var names = []
    attributes = node.getAttrList(_node,_frame)
    for(var a in attributes){
        const attr = attributes[a]
        names.push(attr.fullKeyword())

        if(attr.hasSubAttributes()){
            sub_attr = attr.getSubAttributes()
            for (var b in sub_attr){
                var sub = sub_attr[b]
                names.push(sub.fullKeyword())
            }
        }
        
    }
    var msg = "\n-------------------ATTRIBUTES OF "+_node+" ( "+node.type(_node)+") ----------------\n"
    names.sort()
    for(var n in names){
        const name = names[n]
        const value = node.getTextAttr(_node,aframe,name);
        table[name] = value
        msg+="\n"+name+" : ("+value+") type["+typeof(value)+"]"
    }
    msg+="\n--------------------------------------------------------------------------\n"
    MessageLog.trace(msg)
    //MessageBox.information(msg)
    return table
}