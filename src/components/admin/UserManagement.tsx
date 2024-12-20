import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface User {
  id: string;
  email: string;
  tokens: number;
}

interface AuthUser {
  id: string;
  email?: string;
}

export const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchUsers = async () => {
    try {
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*');

      // Call the Edge Function with admin password
      const { data, error } = await supabase.functions.invoke('admin', {
        body: { password: '1888' }
      });

      if (error || profilesError) throw new Error('Failed to fetch users');

      const authUsers = data?.users as AuthUser[] || [];

      const combinedUsers = profiles?.map(profile => {
        const authUser = authUsers.find(u => u.id === profile.id);
        return {
          id: profile.id,
          email: authUser?.email || '',
          tokens: profile.tokens || 0
        };
      });

      setUsers(combinedUsers || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить пользователей",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUpdateTokens = async (userId: string, newTokens: number) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ tokens: newTokens })
        .eq('id', userId);

      if (error) throw error;

      toast({
        title: "Успешно",
        description: "Токены обновлены",
      });

      fetchUsers();
    } catch (error) {
      console.error('Error updating tokens:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось обновить токены",
        variant: "destructive"
      });
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      // Call the Edge Function to delete the user
      const { error } = await supabase.functions.invoke('admin', {
        body: { 
          password: '1888',
          userId: userId,
          action: 'delete'
        }
      });

      if (error) throw error;

      toast({
        title: "Успешно",
        description: "Пользователь удален",
      });

      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось удалить пользователя",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-white text-xl animate-pulse">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6 rounded-lg bg-gradient-to-br from-gray-900 to-gray-800 shadow-xl animate-fade-in">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-white tracking-tight">Управление пользователями</h2>
        <p className="text-gray-400">Всего пользователей: {users.length}</p>
      </div>
      
      <div className="overflow-x-auto rounded-lg border border-gray-800 shadow-md">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-900/50">
              <TableHead className="text-gray-300 font-medium">Email</TableHead>
              <TableHead className="text-gray-300 font-medium">Токены</TableHead>
              <TableHead className="text-gray-300 font-medium">Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow 
                key={user.id}
                className="transition-colors hover:bg-gray-800/50"
              >
                <TableCell className="text-white font-medium">{user.email}</TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={user.tokens}
                    onChange={(e) => handleUpdateTokens(user.id, parseInt(e.target.value))}
                    className="w-24 bg-gray-800 border-gray-700 text-white focus:ring-primary focus:border-primary transition-all"
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="destructive"
                    onClick={() => handleDeleteUser(user.id)}
                    className="hover:bg-red-600 transition-colors"
                  >
                    Удалить
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};