/** Automate scanning for new or changed i18next.js translation keys */
var gulp = require('gulp');
var scanner = require('i18next-scanner');

gulp.task('i18next', function() {
    return gulp.src(['src/**/*.{js,html}'])
        .pipe(scanner({
            lngs: ['en', 'it'], // supported languages ['es', 'de', 'fr', 'pt', 'la', 'nl']
            ns: ['translation', 'anniversary'],
            resource: {
                // the source path is relative to the current working directory
                loadPath: process.env.GITHUB_WORKSPACE+'/public/locales/{{lng}}/{{ns}}.json',
                // the destination path is relative to your `gulp.dest()` path
                savePath: 'locales/{{lng}}/{{ns}}.json',
                jsonIndent: 4
            }
        }))
        .pipe(gulp.dest(process.env.GITHUB_WORKSPACE+'/public'));
});
