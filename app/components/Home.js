import React, { Component } from 'react';
import fs from 'fs';
import moment from 'moment';      // day-time
import { exec } from 'child_process';
// import { Link } from 'react-router';   // not currently needed
import styles from './Home.css';
// removed flow for now, will add later w/ type annotations etc.

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      tags: '',
      question: '',
      solution: ''
    };

    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeTags = this.handleChangeTags.bind(this);
    this.handleChangeQuestion = this.handleChangeQuestion.bind(this);
    this.handleChangeSolution = this.handleChangeSolution.bind(this);
    this.emptyDialogs = this.emptyDialogs.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.enableTab = this.enableTab.bind(this);
  }

  handleChangeTitle(event) {
    this.setState({ title: event.target.value });
  }

  handleChangeTags(event) {
    this.setState({ tags: event.target.value });
  }

  handleChangeQuestion(event) {
    this.setState({ question: event.target.value });
  }

  handleChangeSolution(event) {
    this.setState({ solution: event.target.value });
  }

  emptyDialogs() {
    this.setState({ title: '' });
    this.setState({ tags: '' });
  }

  /*
  enableTab(e) {
    add onKeyDown={this.enableTab} to solution's textarea

    need to figure this out:

    possible help:
    https://css-tricks.com/snippets/javascript/support-tabs-in-textareas/

    or just go full steam ahead and embed a code editor (not likely!)
  }
  */

  handleSubmit(event) {
    // generating file name and path
    const currDate = moment().format('YYYY-MM-DD');
    const currTime = moment().format('hh:mm:ss');
    const dirToWrite = '/Users/AhsanAzim/Developer/Algos/_posts';
    const titleDashed = this.state.title.replace(/ /g, '-');
    const fName = `${currDate}-${titleDashed}.md`;
    const fNameAndPath = `${dirToWrite}/${fName}`;

    // generating text to insert
    const header = `---\nlayout: post\ntitle: ${this.state.title}\ndate:  ${currDate} ${currTime}\ncategories: ${this.state.tags}\n---\n`;
    const body = `**Question:**\n${this.state.question}\n\n\n**Solution:**  \n{% highlight python %}\n${this.state.solution}\n{% endhighlight %}`;
    const content = `${header}${body}`;

    // insert text into a markdown file in _posts dir
    fs.writeFile(fNameAndPath, content, (err) => {
      if (err) {
        alert(`An error ocurred creating the file ${err.message}`);
      }
      // open file in atom editor
      // note full path necessary (ref: https://discuss.atom.io/t/how-to-execute-node-js-child-process-from-package/4880/12)
      exec(`/usr/local/bin/atom ${fNameAndPath}`, (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          alert(`exec error: ${error}`);
          return;
        }
        this.emptyDialogs();
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
      });
      alert('The file has been succesfully saved');
    });
    event.preventDefault();
  }


  render() {
    return (
      <div className={styles.container}>
        <div className={styles.formContainer}>
          {/* change back to this when Question/Solution added:
            <div className={`${styles.formItem} ${styles.oneLiners}`}>
             both tags and title will be in one formItem bunched together
            */}
          <div className={styles.formItem}>
            <input type="text" value={this.state.title} onChange={this.handleChangeTitle} id={styles.title} placeholder={'title'} />
          </div>
          <div className={styles.formItem}>
            <input type="text" value={this.state.tags} onChange={this.handleChangeTags} id={styles.tags} placeholder={'tags'} />
          </div>
          {/* <div className={`${styles.formItem} ${styles.questionContainer}`}>
            <textarea type="text" value={this.state.question} onChange={this.handleChangeQuestion}
                id={styles.question} placeholder={'question'} />
          </div>
          <div className={`${styles.formItem} ${styles.biggerContainer}`}>
            <textarea type="text" value={this.state.solution} onChange={this.handleChangeSolution}
                id={styles.solution} placeholder={'solution'} />
          </div>*/}
          <div className={styles.formItem}>
            <button onClick={this.handleSubmit}>create template</button>
          </div>
        </div>
      </div>
    );
  }
}
