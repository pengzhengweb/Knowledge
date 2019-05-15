
        const log = console.log.bind(console);
        let json = {
            a:1,
            b:2
        };
        

        let newJson = new Proxy(json, {
            deleteProperty(target, property){
                console.log(`您要删除${property}属性`);
                //TODO
                delete target[property];
            }
        });

        delete newJson.a;

        log(json);//{b:2}
