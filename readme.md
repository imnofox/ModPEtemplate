# ModPE + Node Template

Clone this repo, then run `$ npm install`.
Make sure Grunt is installed.

## Building

**Make sure your main JS file is named the same as your package name**

This utilizes Grunt.
Simply run `$ grunt`

- Uses browserify to build into one file with module support
- Uses babel to support ES6 syntax in ModPE

### Testing

Run `$ grunt test`

Make sure you have [an FTP server running on your testing device](https://play.google.com/store/apps/details?id=com.theolivetree.ftpserver), and a config file named `.ftppass`.

`.ftppass` should have the format:
```
{
	"key": {
		"ip": "192.168.1.xx",
		"port": 2221,
		"username": "xxxx",
		"password": "xxxx"
	}
}
```
