function addLabel(tree) {
    function tool(original, current, flag = true) {
        let res = ''
        if (original) {
            res = `${original}.` + `${current}`
        } else {
            res = `${current}`
        }

        return flag ? `(${res})` : res
    }

    function getTitle(items, result = [], index = '') {
        items.forEach((item, i) => {
            result.push(tool(index, i + 1) + item.name);
            if (item.children) {
                getTitle(item.children, result, tool(index, i + 1, false));
            }
        })
        return result;
    }
    return getTitle(tree.children || [], [tree.name]);
}
var chapterTree = {
    name: '总章节',
    children: [{
            name: '章节一',
            children: [{
                    name: '第一节',
                    children: [
                        { name: '第一小节' },
                        { name: '第二小节' }
                    ]
                },
                { name: '第二节' }
            ]
        },
        {
            name: '章节二',
            children: [
                { name: '章节2-1' },
                { name: '章节2-2' }
            ]
        }
    ]
}

var demo = addLabel(chapterTree);
console.log(demo);

// function addLabel(tree) {
//     function tool(orginal, current, flag = true) {
//         let res = '';
//         if (orginal) {
//             res = `${orginal}.` + `${current}`;
//         } else {
//             res = `${current}`;
//         }
//         return flag ? `(${res})` : res;
//     }

//     function getTitle(items, result = [], index = '') {
//         items.forEach((item, i) => {
//             result.push(tool(index, i + 1) + item.name);
//             if (item.children) {
//                 getTitle(item.children, result, tool(index, i + 1, false));
//             }
//         })
//         return result;
//     }

//     return getTitle(tree.children || [], [tree.name]);
// }