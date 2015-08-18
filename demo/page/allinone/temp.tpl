<div class="handlebars-demo">
  {{name}} 说，我很{{what}} <br>

  花名册：
  <ul>
  	{{#each allPepole}}
  	<li>姓名：{{name}}-----年龄: {{age}}</li>
  	{{/each}}
  </ul>
</div>