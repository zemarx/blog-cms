'use strict';

// This function recieves flat tree as argument and
// creates a json object tree with all the parents and children

/** Single tree node object is:
   {
        _id: '',
        post_id: '',
        parent_id: '',
        author_name: '',
        is_archived: '',
        content: '',
        last_time_edited: '',
        date_created: '',
        children: [ here will go all the children of the same type as parent object]
   }
**/

const buildTree = (flat_tree) => {
    let nodes = [];
    let completeTree = [];
    let lookupList = {};

    for (let i = 0; i < flat_tree.length; i++) {
        let tmpNode = {
            _id: flat_tree[i]._id,
            post_id: flat_tree[i].post_id,
            parent_id: flat_tree[i].parent_id,
            author_name: flat_tree[i].author_name,
            is_archived: flat_tree[i].is_archived,
            content: flat_tree[i].content,
            last_time_edited: flat_tree[i].last_time_edited,
            date_created: flat_tree[i].date_created,
            children: flat_tree[i].children
        };

        lookupList[tmpNode._id] = tmpNode;
        nodes.push(tmpNode);

        if (tmpNode.parent_id === null || tmpNode.parent_id === '') {
            completeTree.push(tmpNode);
        }
    }

    for (let i = 0; i < nodes.length; i++) {
        let tmpNode = nodes[i];

        if ((tmpNode.parent_id !== null) && (tmpNode.parent_id !== '')) {
            lookupList[tmpNode.parent_id].children = lookupList[tmpNode.parent_id].children.concat([tmpNode]);
        }
    }

    return completeTree;
};

export default buildTree;
