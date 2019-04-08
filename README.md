# README

## Ruby version
```
ruby 2.3.3
```

### Configuration

#### Install ruby 2.3.3
1. Install rbenv (refer to https://github.com/rbenv/rbenv)
2. Use rbenv
```
rbenv install 2.3.3
rbenv local 2.3.3
```

#### Bundle install
1. Install bundle
**Linux**
```
sudo apt install ruby-bundler
sudo apt install yarn
bundle update parser
gem install pg
```

2. Install the gem
```
bundle install
yarn install
```
## Launching the app
`rails s`

## Log in credentials
```
rails db:seed
```

Use user seed email and password to connect
