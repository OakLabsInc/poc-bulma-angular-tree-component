import { AfterContentInit, AfterViewInit, Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';

import { ITreeOptions, TreeComponent, TreeModule, TreeNode } from '@circlon/angular-tree-component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit{

  title = 'poc-bulma-angular-tree-component';
  
  nodes = [
    {
      name: 'root1',
    },
    {
      name: 'root2',
      children: [
        { name: 'child1' },
        { name: 'child2', children: [
          { name: 'grandchild1' },
          { name: 'grandchild2' }
        ] }
      ]
    },
    {
      name: 'asyncroot',
      hasChildren: true
    }
  ];

  options: ITreeOptions = {
    useCheckbox: true,
    getChildren: this.getChildren.bind(this),
    nodeClass: (node:TreeNode) => {
      return 'my-tree';
    }
  };

  optionsDisabled: ITreeOptions = {
    useCheckbox: true,
    getChildren: this.getChildren.bind(this),
    useTriState: false
  };

  getChildren(node: any) {
    const newNodes = [
      {
        name: 'child1'
      }, {
        name: 'child2'
      }
    ];

    return new Promise((resolve, reject) => {
      
      setTimeout(() => { 
        resolve(newNodes);
      });

      
    });
  }

  ngAfterViewInit() {

  }
  focusedTag:any = ".my-tree .node-content-wrapper-focused,.node-content-wrapper-active"
  setNodeChildrenStyles (e:any) {
    setTimeout(()=>{
      console.log(e);
  
        let tags = document.querySelectorAll(this.focusedTag);
        
        tags.forEach((tag:any) => {
          tag.classList.add('has-background-primary-light')
          tag.classList.add('has-text-white')
        });

    })
    
      
  }
  removeBackgrounds (e:any) {
    console.log(e);
    let tags = document.querySelectorAll('.my-tree .node-content-wrapper');
    tags.forEach((tag:any) => {

      tag.classList.remove('has-background-primary-light')
      tag.classList.remove('has-text-white')
    });
  }
  

}
