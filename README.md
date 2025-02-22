# Magento 2 Upgrade GUI

A GUI tool to help you visually and easily spot differences in a three-way comparison between the version you upgraded from, the version you upgraded to, and your Magento preferences, plugins and overrides.

This is an Electron app to make it easier for you to read and process the output files of the [Ampersand Magento2 Upgrade Patch Helper](https://github.com/AmpersandHQ/ampersand-magento2-upgrade-patch-helper).

On the left, it will show the differences between the files of your previous Magento version and the version you upgraded to.

On the right, it will show the customization (override/preference/plugin) in your project and third party extensions. 

This will allow you to quickly see differences and to assess whether this change is relevant for your customization.

![App home](https://user-images.githubusercontent.com/431360/191521244-7bbb85e7-9ec6-492a-9570-8b458f8134ce.png)

## Instructions

To use this app, you will need the following files in your Magento 2 directory;
- `vendor` (regular composer directory)
- `vendor.patch` (generated by the upgrade patch helper)
- `vendor_files_to_check.patch` (generated by the upgrade patch helper)
- `patch-helper-output.txt` (the output generated by the upgrade patch helper, directed from stdout to a file)
- `classmap.json` (see below)

You will need to generate the `classmap.json` file yourself. This is needed because the tool needs to map PSR-4 classnames to actual filenames, which Composer can do for us. Run these commands to generate the file;

```bash
composer dump --classmap-authoritative
php -r "\$classmap=require_once('vendor/composer/autoload_classmap.php'); echo json_encode(\$classmap);" > classmap.json
```

## Output

When you open up a project directory, the GUI will create 3 result files in the Magento 2 root directory; `warnings.json`, `infoNotices.json` and `results.md`. The `warnings.json` file is used to track state so you can close the GUI and continue working on the project. The Markdown file resembles that state, but in a nice Markdown format you can paste it into your issue management system to keep your colleagues uptodate.

## Screenshots

![Editor](https://user-images.githubusercontent.com/431360/191521234-0a9c4473-5a71-47ef-bd2e-ccbe45513deb.png)

![Instructions page](https://user-images.githubusercontent.com/431360/191521238-37d47cf9-893e-428c-9a61-7730387929d0.png)

## Installation

Download the `AppImage` file from the [releases](https://github.com/elgentos/magento2-upgrade-gui/releases) page. Make it executable (with `chmod +x`) and run it!

## Git auto-commit

If you have this feature enabled (default), it will add the file to the git stage and commit to your repository when you click "Resolve". Enabling/disabling this feature and the commit message can be changed in the Settings screen.

## GitLab integration

By setting a few config settings, you can auto-update an issue with your progress. The GUI will create a note on the issue with a Markdown table. It will then update that note when an item is changed.

You can set these settings in the Settings screen.

![Settings page](https://user-images.githubusercontent.com/431360/191521240-15d626eb-dfc0-496d-9728-57cd834d2b6d.png)

The output in Gitlab will look like this:

![image](https://user-images.githubusercontent.com/431360/188888302-46c79be9-d499-4dcf-b71a-7359d09bdcf3.png)

## Config file

The config file will be created when the app first starts.

```
{
    "gitlab": {
            "host": "https://gitlab.com",
            "token": "xxxxxxxxxxxxxxxxx",
            "project_id": "123",
            "issue_id": "123"
    },
    "git": {
            "auto_commit": true,
            "auto_commit_message": "Upgrade: resolved %s"
    }
}
```

It is stored in your home dir, but the location differs per OS. On Linux, it is `~/.config/magento2-upgrade-gui/config.json`.

## PhpStorm integration

You can click on the file path on the right hand side (or on the "Original vendor file" and "New vendor file" links on the left hand side) to have it open the file in PhpStorm (make sure you have the project open first). To disable JetBrains warning `'file' API is requested. Do you trust unknown host?`, you can go to `File > Settings > Build, Execution, Deployment > Debugger` and Check the `Allow unsigned requests` in the Built-in Server section.

## Development

Clone this repo and run this command to install all necessary dependencies:

```
yarn install
```

To start developing the app, you can run:

```
NODE_ENV=development yarn electron:serve
```
