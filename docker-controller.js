const dockerCompose = require( 'docker-compose' );
const path = require( 'path' );
const cwd = path.join( __dirname );
const option = { cwd: cwd, log: true };

async function setup() {
	await dockerCompose.down( option );

	dockerCompose.up( option )
		.then(
			out => {
				console.log( out );
			},
		);

	await dockerCompose.run(
		'cli',
		'core install --title="elementor" --admin_user=admin --admin_password=password --admin_email=test@test.com --skip-email --url=http://localhost:4000',
		option );
	await dockerCompose.run(
		'cli',
		'plugin install elementor',
		option );

	await dockerCompose.run(
		'cli',
		'plugin activate elementor'
		, option );

	console.log( 'yay' );
}

setup();


//docker-compose run --rm -u 33 cli core install --title="elementor" --admin_user=admin --admin_password=password --admin_email=test@test.com --skip-email --url=http://localhost:4000
//docker-compose run --rm -u 33 cli plugin install elementor
//docker-compose run --rm cli plugin activate elementor
//echo "wordpress installed "
