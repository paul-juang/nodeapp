const KEY = 'debounce-terms';
        
        let init = function(){
            //document.getElementById('txt-search').addEventListener('input', search);
            document.getElementById('txt-search').addEventListener('input', efficientSearch);
            
            let terms = ['apple', 'acorn', 'bee', 'beet', 'beef', 'bunny', 'cookie', 
                         'corn', 'corndog', 'dog', 'dogma', 'echo', 'elephant'];
            localStorage.setItem(KEY, JSON.stringify(terms));
        }
         
        let search = function(ev){
            let text = ev.target.value;
            document.getElementById('output').textContent = `List Matching ${text}`;
            let ul = document.getElementById('matches');
            
            //call an asynchronous search to match what has been typed
            getList(text)
            .then((list)=>{
                ul.innerHTML = '';
                if( list.length == 0){
                    let li = document.createElement('li');
                    li.textContent = "NO MATCHES";
                    ul.appendChild(li);
                }else{
                    list.forEach(item=>{
                        let li = document.createElement('li');
                        li.textContent = item;
                        ul.appendChild(li);
                    })
                }
            })
            .catch(err=>console.warn(err));
        }
        
        let getList = function(txt){
            return new Promise((resolve, reject)=>{
                //use setTimeout with random value to show what can happen
                let r = Math.floor(Math.random()*1000);
                setTimeout((function(){
                    let t = '^' + this.toString();
                    let pattern = new RegExp(t, 'i'); //starts with t
                    let terms = JSON.parse(localStorage.getItem(KEY));
                    let matches = terms.filter(term => pattern.test(term));
                    console.log('matches', matches);
                    resolve(matches);
                }).bind(txt), r);
            })
        }
        
        let debounce = function(func, wait, immediate) {
            var timeout;
            return function() {
                var context = this, args = arguments;
                var later = function() {
                    timeout = null;
                    if (!immediate) func.apply(context, args);
                };
                var callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow) func.apply(context, args);
            };
        };
        
        let efficientSearch = debounce(function(ev){
            let text = ev.target.value;
            document.getElementById('output').textContent = `List Matching ${text}`;
            let ul = document.getElementById('matches');
            
            //call an asynchronous search to match what has been typed
            getList(text)
            .then((list)=>{
                ul.innerHTML = '';
                if( list.length == 0){
                    let li = document.createElement('li');
                    li.textContent = "NO MATCHES";
                    ul.appendChild(li);
                }else{
                    list.forEach(item=>{
                        let li = document.createElement('li');
                        li.textContent = item;
                        ul.appendChild(li);
                    })
                }
            })
            .catch(err=>console.warn(err));
        }, 300);
        //call the debounced function at most once every 300ms
           
        document.addEventListener('DOMContentLoaded', init);
        
        