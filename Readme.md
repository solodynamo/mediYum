[![mediYum.png](https://s24.postimg.org/zafuy9o1h/medi_Yum.png)](https://postimg.org/image/k1pxkhucx/)


A very very very micro medium editor clone . WIP!

### Get Instantly Writing
- Clone the repo.

```bash
git clone https://github.com/solodynamo/mediYum.git
cd mediYum
npm install -g gulp
npm install
gulp totalBuild
```
Open editor.html in browser.

> Main Files


    ├── gulpfile.js             # File through which all command runs.

    ├── README.md               # File from which you are reading currently.

    ├── editor.html             # Main markup

    ├── scss
        └── global.scss         # Contains global scss.
        └── main.scss           # Main file
        └── mediYum.scss        # Contains editor toolbar scss.
    ├── js
       └── mediYum.js           # JS file

#### Gulp Commands
 ```bash
 gulp sass (compiles and minify scss into dist/css)
 gulp total (uglifies/obfuscates/babelify js file into dist/minjs)
 gulp totalBuild (Does all the above stuff at once)
 ```

## Contributing
mediYum :heart: contributions. Feel free to send this repo a PR.

1. Create an issue if there is one
2. [Fork the repo] (https://github.com/solodynamo/mediYum.git/fork)
3. Create your feature branch (`git checkout -b your-feature`)
4. Add and commit your changes (`git commit -am 'message'`)
5. Push the branch (`git push origin your-feature`)
6. Create a new Pull Request

### Feedback
[Create an issue](https://github.com/solodynamo/mediYum.git/issues) for all discussions, bugs, feature requests and pull requests.

### Authors
 [**solodynamo**](https://github.com/solodynamo)

Contribute and add your name in above list.

## Todos
mediYum :heart: contributions. Feel free to send this repo a PR.

1. Make each paragraph drag and droppable.
2. Allow users to add links

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
