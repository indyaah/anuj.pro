---
layout: post
title: Simple ToDo list in terminal (using ZSH, Oh-My-ZSH, custom theme/scripts)
---

Most of us get easily distracted while working on important tasks, when you really need to concentrate on something.
Atleast I am really bad at this, the more you try to concentrate, the more your mind takes you away from the problem.

So I decided to write down a small and quick hack into A.W.E.S.O.M.E [oh-my-zsh](https://github.com/robbyrussell/oh-my-zsh). 

The customized theme looks into a simple file (called ~/.todo), greps the first line and shows a constant right propmpt on the terminal, not quite a hack, right?

But still it serves my purpose, because as long as the flag is read (i.e. at least one task in the bucket) a small script called get-shit-done (dont remeber the source but not mine) would block all the noisy sites on the system by overwriting /etc/hosts. :P

To add new task `task-add "10. Complete this."`

As you finish the task you can again type `complete <task no.>` and the task is out and next one (based on line no not task no though) will be shown using the simplest possible command which is inverted grep, pipe to temp file and rename the temp file as main file.

If you're sure that there some unique word in the task description you can use that as well.

To add a task `task-add "task_no. task description"`

<img src="../images/bash-todo.png" style="width: 100%;" alt="Bash Image" />

TO_BE_UPDATED with code (and github link).!