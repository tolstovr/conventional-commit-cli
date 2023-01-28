#! /usr/bin/env node
// ref: https://blog.logrocket.com/creating-a-cli-tool-with-node-js/
import { spawn } from 'child_process';
import inquirer from 'inquirer';
import inquirerPrompt from 'inquirer-search-list';

inquirer.registerPrompt('search-list', inquirerPrompt);

// Ask user from a list of options
// ask for type of commit
// ask for gitmoji
inquirer.prompt([
    {
        type: 'search-list',
        name: 'commitType',
        message: 'What type of commit are you making?',
        choices: [
            {name: 'skip', value: ''},
            {name: 'feat: A new feature', value: 'feat'},
            {name: 'fix: A bug fix', value: 'fix'},
            {name: 'docs: Documentation only changes', value: 'docs'},
            {name: 'style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)', value: 'style'},
            {name: 'refactor: A code change that neither fixes a bug nor adds a feature', value: 'refactor'},
            {name: 'perf: A code change that improves performance', value: 'perf'},
            {name: 'test: Adding missing tests or correcting existing tests', value: 'test'},
            {name: 'build: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)', value: 'build'},
            {name: 'ci: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)', value: 'ci'},
            {name: 'chore: Other changes that don\'t modify src or test files', value: 'chore'},
            {name: 'revert: Reverts a previous commit', value: 'revert'}
        ],
    },
    {
        type: 'search-list',
        name: 'gitmoji',
        message: 'What gitmoji are you using?',
        choices: [
            {name: 'skip', value: ''},
            {name: '🎨 :art: Improve structure / format of the code.', value: '🎨'},
            {name: '⚡️ :zap: Improve performance.', value: '⚡️'},
            {name: '🔥 :fire: Remove code or files.', value: '🔥'},
            {name: '🐛 :bug: Fix a bug.', value: '🐛'},
            {name: '🚑 :ambulance: Critical hotfix.', value: '🚑'},
            {name: '✨ :sparkles: Introduce new features.', value: '✨'},
            {name: '📝 :memo: Add or update documentation.', value: '📝'},
            {name: '🚀 :rocket: Deploy stuff.', value: '🚀'},
            {name: '💄 :lipstick: Add or update the UI and style files.', value: '💄'},
            {name: '🎉 :tada: Begin a project.', value: '🎉'},
            { name: '✅ :white_check_mark: Add or update tests.', value: '✅'},
            {name: '🔒 :lock: Fix security issues.', value: '🔒'},
            {name: '🔖 :bookmark: Release / Version tags.', value: '🔖'},
            {name: '🚨 :rotating_light: Fix compiler / linter warnings.', value: '🚨'},
            {name: '🚧 :construction: Work in progress.', value: '🚧'},
            {name: '💚 :green_heart: Fix CI Build.', value: '💚'},
            {name: '⬇️ :arrow_down: Downgrade dependencies.', value: '⬇️'},
            {name: '⬆️ :arrow_up: Upgrade dependencies.', value: '⬆️'},
            {name: '📌 :pushpin: Pin dependencies to specific versions.', value: '📌'},
            {name: '👷 :construction_worker: Add or update CI build system.', value: '👷'},
            {name: '📈 :chart_with_upwards_trend: Add or update analytics or track code.', value: '📈'},
            {name: '♻️ :recycle: Refactor code.', value: '♻️'},
            {name: '➖ :heavy_minus_sign: Remove a dependency.', value: '➖'},
            {name: '🐳 :whale: Work about Docker.', value: '🐳'},
            {name: '➕ :heavy_plus_sign: Add a dependency.', value: '➕'},
            {name: '🔧 :wrench: Add or update configuration files.', value: '🔧'},
            {name: '🔨 :hammer: Add or update development scripts.', value: '🔨'},
            {name: '🌐 :globe_with_meridians: Internationalization and localization.', value: '🌐'},
            {name: '✏️ :pencil2: Fix typos.', value: '✏️'},
            {name: '💩 :hankey: Write bad code that needs to be improved.', value: '💩'},
            {name: '⏪ :rewind: Revert changes.', value: '⏪'},
            {name: '🔀 :twisted_rightwards_arrows: Merge branches.', value: '🔀'},
            {name: '📦 :package: Add or update compiled files or packages.', value: '📦'},
            {name: '👽 :alien: Update code due to external API changes.', value: '👽'},
            {name: '🚚 :truck: Move or rename resources (e.g.: files, paths, routes).', value: '🚚'},
            {name: '📄 :page_facing_up: Add or update license.', value: '📄'},
            {name: '💥 :boom: Introduce breaking changes.', value: '💥'},
            {name: '🍱 :bento: Add or update assets.', value: '🍱'},
            {name: '♿️ :wheelchair: Improve accessibility.', value: '♿️'},
            {name: '💡 :bulb: Add or update comments in source code.', value: '💡'},
            {name: '💬 :speech_balloon: Add or update text and literals.', value: '💬'},
            {name: '🗃 :card_file_box: Perform database related changes.', value: '🗃'},
            {name: '🔊 :loud_sound: Add or update logs.', value: '🔊'},
            {name: '🔇 :mute: Remove logs.', value: '🔇'},
            {name: '👥 :busts_in_silhouette: Add or update contributor(s).', value: '👥'},
            {name: '🚸 :children_crossing: Improve user experience / usability.', value: '🚸'},
            {name: '🏗 :building_construction: Make architectural changes.', value: '🏗'},
            {name: '📱 :iphone: Work on responsive design.', value: '📱'},
            {name: '🤡 :clown_face: Mock things.', value: '🤡'},
            {name: '🥚 :egg: Add or update an easter egg.', value: '🥚'},
            {name: '🙈 :see_no_evil: Add or update a .gitignore file.', value: '🙈'},
            {name: '📸 :camera_flash: Add or update snapshots.', value: '📸'},
            {name: '⚗️ :alembic: Experiments.', value: '⚗️'},
            {name: '🔍 :mag: Improve SEO.', value: '🔍'},
            {name: '☸️ :wheel_of_dharma: Work about Kubernetes.', value: '☸️'},
            {name: '🏷️ :label: Add or update types (Flow, TypeScript).', value: '🏷️'},
            {name: '🌱 :seedling: Add or update seed files.', value: '🌱'},
            {name: '🚩 :triangular_flag_on_post: Add, update, or remove feature flags.', value: '🚩'},
            {name: '🥅 :goal_net: Catch errors.', value: '🥅'},
            {name: '💫 :dizzy: Add or update animations and transitions.', value: '💫'},
            {name: '🗑️ :wastebasket: Deprecate code that needs to be cleaned up.', value: '🗑️'},
            {name: '🛂 :passport_control: Work about OAuth.', value: '🛂'},
            {name: '🩹 :adhesive_bandage: Add or update a dependency injection.', value: '🩹'},
            {name: '➰ :curly_loop: Add or update a loop.', value: '➰'},
        ]
    },
    {
        type: 'input',
        name: 'commitMessage',
        message: 'Enter the commit message:'
    }
]).then((answers) => {
    const checkStatus = spawn('git', ['status', '--porcelain']);

    checkStatus.stdout.on('data', (data) => {
        console.log(data);
    });
    checkStatus.stderr.on('data', (data) => {
        console.error(data);
    });
    // checkStatus.on('close', (code) => {
    //     console.log(`child process exited with code ${code}`);
    // });

    answers.commitMessage = answers.commitMessage.trim();
    if (answers.commitMessage.length === 0) {
        console.log('Commit message cannot be empty');
        return;
    }
    const commitMessage = `${answers.commitType}: ${answers.gitmoji} ${answers.commitMessage}`;

    const gitCommit = spawn('git', ['commit', '-m', commitMessage]);
    gitCommit.stdout.on('data', (data) => {
        console.log(`${data}`);
    });
    gitCommit.stderr.on('data', (data) => {
        console.log(`${data}`);
    });

    gitCommit.on('close', (code) => {
        if (code !== 0) {
            console.log(`git commit failed with code ${code}`);
            return;
        }
        console.log('Commit successful', commitMessage);
    });
});

