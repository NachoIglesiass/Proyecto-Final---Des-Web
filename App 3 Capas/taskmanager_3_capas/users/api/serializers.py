from django.contrib.auth.models import User
from rest_framework import serializers

class RegistrationSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['username','email','password']
        extra_kwards = {
            'password': {'write_only': True}
        }


    def validate(self, data):
        if len(data['password']) < 8:
            raise serializers.ValidationError({'error':'Password must be at least 8 characters long.'})

        if User.objects.filter(email=data['email']).exists():
             raise serializers.ValidationError({'error': "Email already in use."})
        
        return data
        
    def create(self, validated_data):
        user = self.Meta.model(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user
    
