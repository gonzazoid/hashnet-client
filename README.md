### hashnet-client
Collection of functions making #Net interactions easier

#### Installing

```
npm install hashnet-client
```

#### Usage

##### upload file

``upload-file.html``
```
<html>
  <head>
    <style>
      body {
        margin: 3% 10%;
        line-height: 3rem;
      }
      #flexContainer {
        display: flex;
        flex-direction: row;
      }
    </style>
  </head>
  <body>
    <div>
      <h4>#Net: upload file </h4>
    </div>
    <div id="flexContainer">
      <div>
        <label for="file">file:</label>
        <input type="file" id="file" name="file" />
      </div>
    </div>
    <input type="button" id="upload" value="upload" />
    <br />
    <div>
      <span>File was uploaded as: </span>
      <span id="hash"></span>
    </div>
    <script src="hash://sha256/upload-file.js"></script>
  </body>
</html>
```

``upload-file.js``

```
import { publisHashMessage } from "hashnet-client";

const onFileChange = () => {
  const hashElement = document.getElementById("hash");
  hashElement.innerHTML = "";
};

document.getElementById("file").addEventListener("change", onFileChange);

const uploadFile = () => {
  const file = document.getElementById("file").files[0];

  const reader = new FileReader();
  reader.onload = async (e) => {
    const hash = await publishHashMessage(e.target.result);
    console.log("DIGEST!!!", hash); // something like sha256:678ef37.....
    const hashElement = document.getElementById("hash");
    hashElement.innerHTML = `hash://${hash.split(":").join("/")}`;
  };
  reader.readAsArrayBuffer(file);
};

document.getElementById("upload").addEventListener("click", uploadFile);
```

##### post message (like in messenger)

```
import { postMessage } from "hashnet-client";

const comment = "I disapprove of what you say, but I will defend to the death your right to say it.";
const label = `/comment/${crypto.randomUUID()}`;
const nonce = "1";
const relatedTo = "https://www.gnu.org/licenses/gpl-3.0.html#license-text";

// it will post message in #Net, first the body which will available by hash://... link
// then signed message (by signing hash of message body) which will be available by signed:// or related:// links
postMessage(comment, label, nonce, relatedTo)
  .then(messageInHashNetFormat => {
    // and returns message in #Net format
    // with editable flag, calculated hash of comment and everything
  })
```
