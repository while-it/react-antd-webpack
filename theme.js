module.exports = () => {
    const primaryColor = '#2acd8f';
    return {
        // Primary
        '@primary-color': primaryColor,
        '@link-color': primaryColor,
        '@border-radius-base': '2px',

        // Input
        '@input-placeholder-color': '#a3afb7',
        '@input-hover-border-color': primaryColor,

        // Button
        '@button-primary-bg': primaryColor,
        // Button lg
        '@btn-height-lg': '48px',
        '@btn-padding-lg': '11px',
        'btn-font-size-lg': '20px',

        // Table
        '@table-header-bg': '#fff',

        // Font
        '@font-size-base': '14px'
    };
};
