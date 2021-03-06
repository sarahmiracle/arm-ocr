# ArmOcr

ArmOcr is a simple web application based on Node.js, that helps to transform images of typed and printed Armenian text into editable and searchable machine text.

<img src="https://sonictik.github.io/images/ArmOcr.jpg">

## Installation
Clone the repository with

```bash
$ git clone https://github.com/sarahmiracle/arm-ocr.git
```

And install the dependencies
```bash
$ cd arm-ocr
$ npm install
```
---

You need to have tesseract-ocr 4.0+
https://launchpad.net/~alex-p/+archive/ubuntu/tesseract-ocr

```bash
$ sudo add-apt-repository ppa:alex-p/tesseract-ocr
$ sudo apt-get update
```

```bash
$ sudo apt-get install tesseract-ocr-grc
```
## Running
Run the server with
```bash
$ node server.js
```
