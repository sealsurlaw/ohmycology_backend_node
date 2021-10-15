#!/bin/bash

source .env

if [ $1 == "up" ]
then
    psql $DB_CONNECTION_STRING -f migrations/users_up.psql
    psql $DB_CONNECTION_STRING -f migrations/posts_up.psql
    psql $DB_CONNECTION_STRING -f migrations/comments_up.psql
    psql $DB_CONNECTION_STRING -f migrations/messages_up.psql
fi

if [ $1 == "down" ]
then
    psql $DB_CONNECTION_STRING -f migrations/users_down.psql
    psql $DB_CONNECTION_STRING -f migrations/posts_down.psql
    psql $DB_CONNECTION_STRING -f migrations/comments_down.psql
    psql $DB_CONNECTION_STRING -f migrations/messages_down.psql
fi