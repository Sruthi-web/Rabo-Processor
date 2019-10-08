RaboProcessor Application

RaboProcessor receives monthly deliveries of customer statement records in two formats, CSV and XML. The records will be validated.

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

This Application Divided in to four components

#headercomponent - Just display the header of the Application.
#recordInputComponent - Get the statement records as input in two formats CSV and XML and convert to JSON.
#recordValidatorComponent - Validates the record.
#recordListComponent - list the failed records.

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

Run the Application

Install Node Modules - npm install

To run application - npm start

Unit tests executed using karma and Jasmine - npm run test

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

Once the application is launched, we should upload the input file and click on validate to validate the result and display the failed records.

The clear button is used to clear the previously processed files
