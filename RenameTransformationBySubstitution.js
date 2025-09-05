function RenameTransformationBySubstitution(_drawing) {

    /*This script 
    take the read that is selected, 
    get his current substition name
    select the deformer that is just above in the hierarchie
    then get the current transformation name
    and rename it by the current substitution name

    then if i'm awesome, it will do that on all the key in timeline (loop)

    then if i'm really really cool, it will do that on several drawings/transformation (loop / if else for the reads that don't have deformation chain)
*/

    // Key.String.Drawing.name(int elementld, int drawingIndex) leementld serai l'id unique de l'élément ?


    selection.selectedNodes(_drawing)

    filtreReadInSelection(){
        if (_drawing != node.getNodes(["READ"])) {

            MessageLog.trace("Please, select a drawing")

        } else {
            var DefName = FSH_get_exposed_substitution(_drawing)

            MessageLog.trace("You have found" + DefName)

            go_up_hierarchie()
            SetCurrentTransformationName(DefName)
            

            //MessageLog.trace("You have succesfully renamed deformer with \n"+ DefName )

        }
    }



}