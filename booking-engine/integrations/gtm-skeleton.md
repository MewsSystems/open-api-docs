# Google Tag Manager Configuration

This guide provides a streamlined process for exporting and configuring a Google Tag Manager (GTM) skeleton suitable for booking engine. Follow these precise steps to efficiently adapt your GTM setup to new requirements.

## Prepare your configuration

1. **Download the configuration file:**
    - Access the prepared skeleton configuration file: [Google Tag Manager - Configuration.json](../.gitbook/assets/GTM-Mews.json).

2. **IMPORTANT: Customize the configuration:**
    - Open the downloaded JSON file in your preferred text editor.
    - Replace all occurrences of `_GA4_ID_` with your actual Google Analytics 4 (GA4) tracking ID.

3. **Prepare for import:**
    - Save the changes to the JSON file, ensuring it is ready to be imported into your GTM account.

## Import configuration into Google Tag Manager

### Import the modified file:

- **Navigate to import options:**
    - In your GTM account, go to the **Admin** tab.
    - Under the container options, select **Import Container**.

- **Select and upload file:**
    - Click on **Choose file** and select your modified JSON file.
    - Decide how to merge this configuration with any existing setup. Options include:
        - **Overwrite**: Replaces the current container with the imported one.
        - **Merge**: Combines the imported configuration with the existing one, with options to resolve conflicts.
        - **Rename**: Adds the imported configuration while renaming any conflicts.

- **Complete the import:**
    - Follow prompts to finalize the import process.

### Update and publish:

- **Review configuration:**
    - Thoroughly check all tags, triggers, and variables to ensure they are correctly configured.

- **Test before publishing:**
    - Utilize GTM's preview mode to test the setup. Ensure that all configurations perform as expected.

- **Publish changes:**
    - Once verified, publish the container to apply your configurations live.
