from rest_framework.decorators import api_view, permission_classes
from.serializers import RegistrationSerializer
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework.authtoken.models import Token




@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def registration_view(request):
    if request.method == 'POST':
        serializer = RegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token, _ = Token.objects.get_or_create(user=user)  # Recupera el token
            data = serializer.data
            data['token'] = token.key  # Agrega el token a la respuesta
            return Response(data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def logout_view(request):
    # Eliminar el token del usuario que hace logout
    if request.method == 'POST':
        request.user.auth_token.delete()
        return Response({"detail": "Logged out successfully"}, status=status.HTTP_200_OK)